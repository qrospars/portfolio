interface Particle {
  x: number;
  y: number;
  previousX: number;
  previousY: number;
  age: number;
  active: boolean;
}

interface RiversController {
  destroy: () => void;
}

function hashSeed(value: string): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed: number): () => number {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function makeNoise(random: () => number) {
  const permutation = Array.from({ length: 256 }, (_, index) => index);
  for (let index = permutation.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [permutation[index], permutation[swapIndex]] = [permutation[swapIndex]!, permutation[index]!];
  }
  const values = new Uint8Array(512);
  for (let index = 0; index < values.length; index += 1) values[index] = permutation[index & 255]!;
  const fade = (value: number) => value ** 3 * (value * (value * 6 - 15) + 10);
  const lerp = (start: number, end: number, amount: number) => start + amount * (end - start);
  const gradient = (hash: number, x: number, y: number) => ((hash & 1) ? -x : x) + ((hash & 2) ? -y : y);

  return (inputX: number, inputY: number) => {
    const floorX = Math.floor(inputX);
    const floorY = Math.floor(inputY);
    const x = inputX - floorX;
    const y = inputY - floorY;
    const gridX = floorX & 255;
    const gridY = floorY & 255;
    const u = fade(x);
    const v = fade(y);
    const a = values[gridX]! + gridY;
    const b = values[gridX + 1]! + gridY;
    return lerp(
      lerp(gradient(values[a]!, x, y), gradient(values[b]!, x - 1, y), u),
      lerp(gradient(values[a + 1]!, x, y - 1), gradient(values[b + 1]!, x - 1, y - 1), u),
      v,
    );
  };
}

function getSessionSeed(): string {
  const fallback = `${Date.now()}-${Math.random()}`;
  try {
    const key = 'quentin-rivers-seed';
    const current = sessionStorage.getItem(key);
    if (current) return current;
    sessionStorage.setItem(key, fallback);
  } catch {
    return fallback;
  }
  return fallback;
}

export function initializeRivers(canvas: HTMLCanvasElement): RiversController {
  const context = canvas.getContext('2d');
  if (!context) return { destroy: () => undefined };

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const random = mulberry32(hashSeed(getSessionSeed()));
  const noise = makeNoise(random);
  const pointer = { x: -9999, y: -9999 };
  let width = 0;
  let height = 0;
  let particles: Particle[] = [];
  let frame = 0;
  let resizeFrame = 0;
  let animationRunning = false;
  let visible = true;
  let destroyed = false;
  let noiseScale = 700;
  let noiseStrength = 44;

  const createParticle = (radius: number): Particle => {
    const angle = random() * Math.PI * 2;
    const x = width / 2 + radius * Math.cos(angle);
    const y = height / 2 + radius * Math.sin(angle);
    return { x, y, previousX: x, previousY: y, age: 0, active: true };
  };

  const seed = () => {
    const particleCount = width > 900 ? 340 : width > 560 ? 230 : 145;
    const radius = Math.min(Math.max(width * (0.24 + random() * 0.1), 82), 390);
    noiseScale = 380 + random() * 850;
    noiseStrength = 32 + random() * 48;
    particles = Array.from({ length: particleCount }, () => createParticle(radius));
  };

  const step = () => {
    for (const particle of particles) {
      if (!particle.active) continue;
      const normalizedNoise = (noise(particle.x / noiseScale, particle.y / noiseScale) + 1) * 0.5;
      const angle = normalizedNoise * noiseStrength;
      particle.previousX = particle.x;
      particle.previousY = particle.y;
      particle.x += Math.cos(angle) * 3.7;
      particle.y += Math.sin(angle) * 3.7;
      particle.age += 1;

      const distanceX = particle.x - pointer.x;
      const distanceY = particle.y - pointer.y;
      const distanceSquared = distanceX ** 2 + distanceY ** 2;
      if (distanceSquared < 15000) {
        const distance = Math.sqrt(distanceSquared) || 1;
        const force = (1 - distance / 123) * 3.2;
        particle.x += (distanceX / distance) * force;
        particle.y += (distanceY / distance) * force;
      }

      particle.active = particle.x > 0
        && particle.x < width
        && particle.y > 0
        && particle.y < height
        && particle.age < 1250;

      if (particle.active) {
        context.beginPath();
        context.moveTo(particle.previousX, particle.previousY);
        context.lineTo(particle.x, particle.y);
        context.stroke();
      }
    }
  };

  const draw = () => {
    if (destroyed || !visible || document.hidden || reducedMotion.matches) {
      animationRunning = false;
      return;
    }
    step();
    if (particles.some((particle) => particle.active)) {
      frame = requestAnimationFrame(draw);
    } else {
      animationRunning = false;
    }
  };

  const start = () => {
    if (animationRunning || destroyed || !visible || document.hidden || reducedMotion.matches) return;
    animationRunning = true;
    frame = requestAnimationFrame(draw);
  };

  const resize = () => {
    cancelAnimationFrame(frame);
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.fillStyle = '#f7f6f3';
    context.fillRect(0, 0, width, height);
    context.strokeStyle = 'rgba(24, 24, 23, 0.5)';
    context.lineWidth = 0.38;
    seed();

    if (reducedMotion.matches) {
      for (let iteration = 0; iteration < 260; iteration += 1) step();
    } else {
      animationRunning = false;
      start();
    }
  };

  const onResize = () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(resize);
  };
  const onPointerMove = (event: PointerEvent) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  };
  const onMotionChange = () => resize();
  const onVisibilityChange = () => {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      animationRunning = false;
    } else {
      start();
    }
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? true;
    if (!visible) {
      cancelAnimationFrame(frame);
      animationRunning = false;
    } else if (!particles.some((particle) => particle.active)) {
      resize();
    } else {
      start();
    }
  });

  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  reducedMotion.addEventListener('change', onMotionChange);
  document.addEventListener('visibilitychange', onVisibilityChange);
  observer.observe(canvas);
  resize();

  return {
    destroy: () => {
      destroyed = true;
      cancelAnimationFrame(frame);
      cancelAnimationFrame(resizeFrame);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      reducedMotion.removeEventListener('change', onMotionChange);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    },
  };
}
