import { describe, expect, it } from 'vitest';
import { DISCIPLINE_IDS } from '@/config/disciplines';
import { buildTimelineLayout, type TimelineMilestone } from './timeline';

const milestones: TimelineMilestone[] = [
  {
    id: 'later',
    date: '2025',
    order: 20,
    discipline: 'aiAgents',
    secondaryDisciplines: ['productUx'],
  },
  {
    id: 'earlier',
    date: '2019',
    order: 10,
    discipline: 'artDesign',
    secondaryDisciplines: ['traditionalArt'],
  },
];

describe('buildTimelineLayout', () => {
  it('sorts milestones and derives primary lanes and secondary echoes', () => {
    const layout = buildTimelineLayout(milestones, { viewportWidth: 1000, height: 600 });

    expect(layout.points.map(({ id }) => id)).toEqual(['earlier', 'later']);
    expect(layout.points[0]?.x).toBeLessThan(layout.points[1]?.x ?? 0);
    expect(layout.points[0]?.y).toBe(layout.laneYs.artDesign);
    expect(layout.points[0]?.echoes).toEqual([
      { discipline: 'traditionalArt', y: layout.laneYs.traditionalArt },
    ]);
    expect(layout.path).toMatch(/^M .* C /);
  });

  it('guarantees a wide minimum gap and adds distance for elapsed years', () => {
    const layout = buildTimelineLayout([
      { id: 'one', date: '2020', order: 10, discipline: 'artDesign' },
      { id: 'two', date: '2020', order: 20, discipline: 'productUx' },
      { id: 'three', date: '2022', order: 30, discipline: 'aiAgents' },
    ], { viewportWidth: 1440 });
    const [one, two, three] = layout.points;

    expect(layout.minimumGap).toBeCloseTo(604.8);
    expect((two?.x ?? 0) - (one?.x ?? 0)).toBeGreaterThanOrEqual(layout.minimumGap);
    expect((three?.x ?? 0) - (two?.x ?? 0)).toBeGreaterThan(layout.minimumGap);
    expect(layout.width).toBeGreaterThan(2700);
  });

  it('keeps deterministic same-lane curves expressive', () => {
    const inputs: TimelineMilestone[] = [
      { id: 'a', date: '2020', order: 10, discipline: 'generativeArt' },
      { id: 'b', date: '2021', order: 20, discipline: 'generativeArt' },
    ];
    const first = buildTimelineLayout(inputs);
    const second = buildTimelineLayout(inputs);

    expect(first.path).toBe(second.path);
    expect(first.path).not.toContain('NaN');
    expect(first.path).not.toMatch(/C [^,]+ 152, [^,]+ 152,/);
  });

  it('creates every discipline lane and a valid empty layout', () => {
    const layout = buildTimelineLayout([]);
    expect(Object.keys(layout.laneYs)).toEqual(DISCIPLINE_IDS);
    expect(layout.path).toBe('');
    expect(layout.points).toEqual([]);
  });
});
