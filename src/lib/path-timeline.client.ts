import { buildTimelineLayout, type TimelineLayout, type TimelineMilestone } from '@/lib/timeline';
import type { DisciplineId } from '@/config/disciplines';

interface ScrollController {
  kill(): void;
  refresh(): void;
}

type GsapTween = ReturnType<(typeof import('gsap'))['gsap']['to']>;

interface TimelineDomEvent extends TimelineMilestone {
  dot: SVGAElement;
  group: SVGGElement;
  card: HTMLElement;
}

const controllers = new Map<HTMLElement, () => void>();
const desktopQuery = '(min-width: 64.01rem) and (pointer: fine)';
const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

function numberAttribute(element: Element, name: string, value: number): void {
  element.setAttribute(name, String(Math.round(value * 100) / 100));
}

function readEvents(root: HTMLElement): TimelineDomEvent[] {
  const dots = [...root.querySelectorAll<SVGAElement>('[data-event-dot]')];
  return dots.map((dot) => {
    const id = dot.dataset.eventId ?? '';
    const group = root.querySelector<SVGGElement>(`[data-event-group="${id}"]`);
    const card = root.querySelector<HTMLElement>(`[data-event-card="${id}"]`);
    if (!id || !group || !card) throw new Error(`Incomplete Path event markup for ${id || 'unknown event'}`);
    return {
      id,
      date: dot.dataset.date ?? '',
      order: Number(dot.dataset.order ?? 0),
      discipline: dot.dataset.discipline as DisciplineId,
      secondaryDisciplines: (dot.dataset.secondary?.split(',').filter(Boolean) ?? []) as DisciplineId[],
      dot,
      group,
      card,
    };
  });
}

function setupVerticalTimeline(root: HTMLElement): () => void {
  root.classList.remove('is-desktop');
  root.classList.add('is-vertical-enhanced');
  const triggers = [...root.querySelectorAll<HTMLButtonElement>('[data-vertical-trigger]')];
  const panels = [...root.querySelectorAll<HTMLElement>('[data-vertical-panel]')];
  const cleanups: Array<() => void> = [];

  const activate = (id: string) => {
    for (const trigger of triggers) {
      const active = trigger.dataset.verticalTrigger === id;
      trigger.setAttribute('aria-expanded', String(active));
      trigger.closest('[data-vertical-event]')?.classList.toggle('is-active', active);
    }
    for (const panel of panels) panel.hidden = panel.dataset.verticalPanel !== id;
  };

  triggers.forEach((trigger, index) => {
    const onClick = () => activate(trigger.dataset.verticalTrigger ?? '');
    const onKeyDown = (event: KeyboardEvent) => {
      const direction = event.key === 'ArrowDown' || event.key === 'ArrowRight'
        ? 1
        : event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? -1 : 0;
      if (!direction) return;
      event.preventDefault();
      triggers[(index + direction + triggers.length) % triggers.length]?.focus();
    };
    trigger.addEventListener('click', onClick);
    trigger.addEventListener('keydown', onKeyDown);
    cleanups.push(() => {
      trigger.removeEventListener('click', onClick);
      trigger.removeEventListener('keydown', onKeyDown);
    });
  });

  if (triggers[0]?.dataset.verticalTrigger) activate(triggers[0].dataset.verticalTrigger);

  return () => {
    cleanups.forEach((cleanup) => cleanup());
    root.classList.remove('is-vertical-enhanced');
    triggers.forEach((trigger) => trigger.setAttribute('aria-expanded', 'true'));
    panels.forEach((panel) => { panel.hidden = false; });
  };
}

function setupDesktopTimeline(root: HTMLElement): () => void {
  const stage = root.querySelector<HTMLElement>('[data-path-stage]');
  const canvas = root.querySelector<HTMLElement>('[data-path-canvas]');
  const svg = root.querySelector<SVGSVGElement>('[data-path-svg]');
  const path = root.querySelector<SVGPathElement>('[data-path-line]');
  const rail = root.querySelector<HTMLElement>('[data-path-rail]');
  const cursor = root.querySelector<HTMLElement>('[data-path-cursor]');
  const progress = root.querySelector<HTMLElement>('[data-path-progress-value]');
  const hint = root.querySelector<HTMLElement>('[data-path-hint]');
  if (!stage || !canvas || !svg || !path || !rail || !cursor || !progress || !hint) return () => {};

  root.classList.remove('is-vertical-enhanced');
  root.classList.add('is-desktop');
  const events = readEvents(root);
  const cleanupListeners: Array<() => void> = [];
  let layout: TimelineLayout;
  let translationX = 0;
  let activeIndex = 0;
  let pointerX = 0;
  let pointerInside = false;
  let frame = 0;
  let disposed = false;
  let observer: IntersectionObserver | undefined;
  let scrollTrigger: ScrollController | undefined;
  let tween: GsapTween | undefined;

  const pointFor = (id: string) => layout.points.find((point) => point.id === id);

  const updateCardPosition = () => {
    const timelineEvent = events[activeIndex];
    const point = timelineEvent ? pointFor(timelineEvent.id) : undefined;
    if (!timelineEvent || !point) return;
    const card = timelineEvent.card;
    const stageWidth = stage.clientWidth;
    const cardWidth = card.offsetWidth;
    const cardHeight = card.offsetHeight;
    const screenX = point.x + translationX;
    const railEdge = rail.offsetWidth + 24;
    let x = screenX + 28;
    if (x + cardWidth > stageWidth - 24) x = screenX - cardWidth - 28;
    x = Math.min(Math.max(x, railEdge), stageWidth - cardWidth - 24);
    const y = Math.min(Math.max(point.y - cardHeight / 2, 18), stage.clientHeight - cardHeight - 54);
    card.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
  };

  const activate = (index: number) => {
    if (!events[index]) return;
    activeIndex = index;
    events.forEach((timelineEvent, eventIndex) => {
      const active = eventIndex === index;
      timelineEvent.group.classList.toggle('is-active', active);
      timelineEvent.dot.setAttribute('aria-current', active ? 'true' : 'false');
      timelineEvent.card.hidden = !active;
    });
    root.querySelectorAll<HTMLElement>('[data-path-lane-label]').forEach((label) => {
      label.classList.toggle('is-active', label.dataset.pathLaneLabel === events[index]?.discipline);
    });
    updateCardPosition();
  };

  const activateNearest = (screenPosition: number) => {
    let nearestIndex = 0;
    let distance = Number.POSITIVE_INFINITY;
    layout.points.forEach((point, index) => {
      const candidate = Math.abs(point.x + translationX - screenPosition);
      if (candidate < distance) {
        distance = candidate;
        nearestIndex = index;
      }
    });
    activate(nearestIndex);
  };

  const renderLayout = () => {
    const height = Math.max(stage.clientHeight, 680);
    layout = buildTimelineLayout(events, {
      viewportWidth: stage.clientWidth,
      height,
      railWidth: rail.offsetWidth,
    });
    canvas.style.width = `${Math.ceil(layout.width)}px`;
    svg.setAttribute('viewBox', `0 0 ${layout.width} ${layout.height}`);
    numberAttribute(svg, 'height', layout.height);
    path.setAttribute('d', layout.path);

    root.querySelectorAll<SVGLineElement>('[data-lane-line]').forEach((line) => {
      const discipline = line.dataset.laneLine as DisciplineId;
      numberAttribute(line, 'x2', layout.width);
      numberAttribute(line, 'y1', layout.laneYs[discipline]);
      numberAttribute(line, 'y2', layout.laneYs[discipline]);
    });

    events.forEach((timelineEvent) => {
      const point = pointFor(timelineEvent.id);
      if (!point) return;
      timelineEvent.group.querySelectorAll<SVGCircleElement>('[data-primary-coordinate]').forEach((circle) => {
        numberAttribute(circle, 'cx', point.x);
        numberAttribute(circle, 'cy', point.y);
      });
      timelineEvent.group.querySelectorAll<SVGLineElement>('[data-echo-stem]').forEach((line) => {
        const discipline = line.dataset.echoStem as DisciplineId;
        numberAttribute(line, 'x1', point.x);
        numberAttribute(line, 'x2', point.x);
        numberAttribute(line, 'y1', point.y);
        numberAttribute(line, 'y2', layout.laneYs[discipline]);
      });
      timelineEvent.group.querySelectorAll<SVGCircleElement>('[data-echo-dot]').forEach((circle) => {
        const discipline = circle.dataset.echoDot as DisciplineId;
        numberAttribute(circle, 'cx', point.x);
        numberAttribute(circle, 'cy', layout.laneYs[discipline]);
      });
    });

    root.querySelectorAll<SVGGElement>('[data-year-marker]').forEach((marker) => {
      const year = Number(marker.dataset.yearMarker);
      const yearPoint = layout.yearMarkers.find((item) => item.year === year);
      if (!yearPoint) return;
      marker.setAttribute('transform', `translate(${yearPoint.x} 0)`);
    });
    activate(activeIndex);
  };

  const onPointerMove = (event: PointerEvent) => {
    const bounds = stage.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    if (x < rail.offsetWidth) return;
    pointerInside = true;
    pointerX = x;
    root.classList.add('has-pointer');
    cursor.style.transform = `translateX(${Math.round(x)}px)`;
    activateNearest(x);
  };
  const onPointerLeave = () => {
    pointerInside = false;
    root.classList.remove('has-pointer');
  };
  stage.addEventListener('pointermove', onPointerMove);
  stage.addEventListener('pointerleave', onPointerLeave);
  cleanupListeners.push(() => {
    stage.removeEventListener('pointermove', onPointerMove);
    stage.removeEventListener('pointerleave', onPointerLeave);
  });

  events.forEach((timelineEvent, index) => {
    const onFocus = () => {
      const point = pointFor(timelineEvent.id);
      if (!point) return;
      activate(index);
      root.classList.add('has-keyboard-cursor');
      cursor.style.transform = `translateX(${Math.round(point.x + translationX)}px)`;
    };
    const onBlur = () => root.classList.remove('has-keyboard-cursor');
    const onKeyDown = (event: KeyboardEvent) => {
      const direction = event.key === 'ArrowRight' || event.key === 'ArrowDown'
        ? 1
        : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 0;
      if (!direction) return;
      event.preventDefault();
      events[(index + direction + events.length) % events.length]?.dot.focus();
    };
    timelineEvent.dot.addEventListener('focus', onFocus);
    timelineEvent.dot.addEventListener('blur', onBlur);
    timelineEvent.dot.addEventListener('keydown', onKeyDown);
    const image = timelineEvent.card.querySelector<HTMLImageElement>('img');
    const onImageLoad = () => updateCardPosition();
    image?.addEventListener('load', onImageLoad);
    cleanupListeners.push(() => {
      timelineEvent.dot.removeEventListener('focus', onFocus);
      timelineEvent.dot.removeEventListener('blur', onBlur);
      timelineEvent.dot.removeEventListener('keydown', onKeyDown);
      image?.removeEventListener('load', onImageLoad);
    });
  });

  const installScroll = async () => {
    const [{ gsap }, { ScrollTrigger }] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]);
    if (disposed) return;
    gsap.registerPlugin(ScrollTrigger);
    const distance = () => Math.max(0, layout.width - stage.clientWidth);
    tween = gsap.to(canvas, { x: () => -distance(), ease: 'none', paused: true });
    scrollTrigger = ScrollTrigger.create({
      trigger: stage,
      start: 'top top',
      end: () => `+=${distance()}`,
      pin: true,
      scrub: true,
      animation: tween,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        translationX = -distance() * self.progress;
        progress.style.transform = `scaleX(${self.progress})`;
        hint.classList.toggle('is-hidden', self.progress > 0.02);
        if (pointerInside) activateNearest(pointerX);
        else activateNearest(stage.clientWidth * 0.52);
        updateCardPosition();
      },
    });
  };

  renderLayout();
  activate(0);
  observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    observer?.disconnect();
    void installScroll().catch(() => {
      root.classList.remove('is-desktop');
    });
  }, { rootMargin: '250% 0px' });
  observer.observe(root);

  const onResize = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      renderLayout();
      scrollTrigger?.refresh();
    });
  };
  window.addEventListener('resize', onResize, { passive: true });
  cleanupListeners.push(() => window.removeEventListener('resize', onResize));

  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    observer?.disconnect();
    scrollTrigger?.kill();
    tween?.kill();
    cleanupListeners.forEach((cleanup) => cleanup());
    root.classList.remove('is-desktop', 'has-pointer', 'has-keyboard-cursor');
    canvas.removeAttribute('style');
    events.forEach((timelineEvent) => timelineEvent.card.removeAttribute('style'));
  };
}

function initializeRoot(root: HTMLElement): () => void {
  const desktopMedia = matchMedia(desktopQuery);
  const motionMedia = matchMedia(reducedMotionQuery);
  let modeCleanup = () => {};
  const setMode = () => {
    modeCleanup();
    modeCleanup = desktopMedia.matches && !motionMedia.matches
      ? setupDesktopTimeline(root)
      : setupVerticalTimeline(root);
  };
  const onChange = () => setMode();
  desktopMedia.addEventListener('change', onChange);
  motionMedia.addEventListener('change', onChange);
  setMode();
  return () => {
    modeCleanup();
    desktopMedia.removeEventListener('change', onChange);
    motionMedia.removeEventListener('change', onChange);
  };
}

export function initializePathTimelines(): void {
  document.querySelectorAll<HTMLElement>('[data-path-timeline]').forEach((root) => {
    controllers.get(root)?.();
    controllers.set(root, initializeRoot(root));
  });
}

export function destroyPathTimelines(): void {
  controllers.forEach((cleanup) => cleanup());
  controllers.clear();
}
