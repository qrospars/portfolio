import { DISCIPLINE_IDS, type DisciplineId } from '@/config/disciplines';

export interface TimelineMilestone {
  id: string;
  date: string;
  order?: number;
  discipline: DisciplineId;
  secondaryDisciplines?: DisciplineId[];
}

export interface TimelineEcho {
  discipline: DisciplineId;
  y: number;
}

export interface TimelinePoint extends TimelineMilestone {
  x: number;
  y: number;
  echoes: TimelineEcho[];
  year: number;
}

export interface TimelineYearMarker {
  year: number;
  x: number;
}

export interface TimelineLayout {
  points: TimelinePoint[];
  path: string;
  width: number;
  height: number;
  minimumGap: number;
  laneYs: Record<DisciplineId, number>;
  yearMarkers: TimelineYearMarker[];
}

export interface TimelineLayoutOptions {
  viewportWidth?: number;
  height?: number;
  railWidth?: number;
}

const DEFAULT_VIEWPORT_WIDTH = 1440;
const DEFAULT_HEIGHT = 820;
const DEFAULT_RAIL_WIDTH = 224;
const VERTICAL_PADDING = 72;

const clamp = (value: number, minimum: number, maximum: number) => (
  Math.min(Math.max(value, minimum), maximum)
);

function yearFromDate(date: string): number {
  return Number(date.slice(0, 4));
}

function stableUnit(value: string): number {
  let hash = 2166136261;
  for (const character of value) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) / 4294967295;
}

function createLaneYs(height: number): Record<DisciplineId, number> {
  const gap = (height - VERTICAL_PADDING * 2) / Math.max(DISCIPLINE_IDS.length - 1, 1);
  return Object.fromEntries(
    DISCIPLINE_IDS.map((discipline, index) => [discipline, VERTICAL_PADDING + index * gap]),
  ) as Record<DisciplineId, number>;
}

function createPath(points: TimelinePoint[]): string {
  if (points.length === 0) return '';
  return points.reduce((path, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    const previous = points[index - 1];
    if (!previous) return path;
    const distance = point.x - previous.x;
    const variation = stableUnit(`${previous.id}:${point.id}`) - 0.5;

    if (previous.y === point.y) {
      const bow = variation * 36;
      return `${path} C ${previous.x + distance * 0.32} ${previous.y + bow}, ${previous.x + distance * 0.68} ${point.y + bow}, ${point.x} ${point.y}`;
    }

    const asymmetry = variation * 0.12;
    const firstControlX = previous.x + distance * (0.3 + asymmetry);
    const secondControlX = previous.x + distance * (0.7 + asymmetry);
    const flow = variation * 18;
    return `${path} C ${firstControlX} ${previous.y + flow}, ${secondControlX} ${point.y - flow}, ${point.x} ${point.y}`;
  }, '');
}

export function buildTimelineLayout(
  milestones: TimelineMilestone[],
  options: TimelineLayoutOptions = {},
): TimelineLayout {
  const viewportWidth = options.viewportWidth ?? DEFAULT_VIEWPORT_WIDTH;
  const height = options.height ?? DEFAULT_HEIGHT;
  const railWidth = options.railWidth ?? DEFAULT_RAIL_WIDTH;
  const minimumGap = clamp(viewportWidth * 0.42, 576, 704);
  const leadIn = Math.max(railWidth + viewportWidth * 0.32, viewportWidth * 0.48);
  const trailOut = viewportWidth * 0.6;
  const laneYs = createLaneYs(height);
  const sorted = [...milestones].sort((a, b) => {
    const dateDifference = Date.parse(`${a.date}-01`) - Date.parse(`${b.date}-01`);
    return dateDifference || (a.order ?? 0) - (b.order ?? 0) || a.id.localeCompare(b.id);
  });

  if (sorted.length === 0) {
    return {
      points: [], path: '', width: viewportWidth, height, minimumGap, laneYs, yearMarkers: [],
    };
  }

  let x = leadIn;
  const points = sorted.map((milestone, index): TimelinePoint => {
    const year = yearFromDate(milestone.date);
    if (index > 0) {
      const previousYear = yearFromDate(sorted[index - 1]?.date ?? milestone.date);
      const elapsedYears = clamp(year - previousYear, 0, 3);
      x += minimumGap * (1 + elapsedYears * 0.18);
    }
    return {
      ...milestone,
      year,
      x,
      y: laneYs[milestone.discipline],
      echoes: (milestone.secondaryDisciplines ?? []).map((discipline) => ({
        discipline,
        y: laneYs[discipline],
      })),
    };
  });

  const yearMarkers: TimelineYearMarker[] = [];
  for (const point of points) {
    if (!yearMarkers.some(({ year }) => year === point.year)) {
      yearMarkers.push({ year: point.year, x: point.x });
    }
  }

  return {
    points,
    path: createPath(points),
    width: (points.at(-1)?.x ?? leadIn) + trailOut,
    height,
    minimumGap,
    laneYs,
    yearMarkers,
  };
}
