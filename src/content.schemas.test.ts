import { describe, expect, it } from 'vitest';
import {
  caseStudyAuthoringSchema,
  milestoneAuthoringSchema,
  pieceAuthoringSchema,
} from './content.schemas';

const pieceModules = import.meta.glob<{ series: string }>('./content/pieces/*.json', {
  eager: true,
  import: 'default',
});
const milestoneModules = import.meta.glob<{
  date: string;
  order: number;
  discipline: string;
  workId: string;
  published: boolean;
}>('./content/milestones/*.json', { eager: true, import: 'default' });

describe('content authoring schemas', () => {
  it('accepts valid case-study metadata and rejects unknown disciplines', () => {
    const valid = {
      title: 'Example',
      summary: 'Existing summary.',
      disciplines: ['dataVisualization'],
      coverAlt: 'Meaningful cover description',
      order: 10,
    };

    expect(caseStudyAuthoringSchema.safeParse(valid).success).toBe(true);
    expect(caseStudyAuthoringSchema.safeParse({
      ...valid,
      disciplines: ['inventedDiscipline'],
    }).success).toBe(false);
  });

  it('requires accessible piece metadata and validates linked and standalone milestones', () => {
    expect(pieceAuthoringSchema.safeParse({
      title: 'Piece', medium: 'Generative art', disciplines: ['generativeArt'], order: 1,
    }).success).toBe(false);
    expect(milestoneAuthoringSchema.safeParse({
      date: 'not-a-date', order: 1, discipline: 'artDesign', title: 'Title', summary: 'Summary',
    }).success).toBe(false);
    expect(milestoneAuthoringSchema.safeParse({
      date: '2022', order: 1, discipline: 'artDesign', workId: 'pieces:example', published: true,
    }).success).toBe(true);
    expect(milestoneAuthoringSchema.safeParse({
      date: '2022', order: 1, discipline: 'artDesign', title: 'Title', summary: 'Summary', published: false,
    }).success).toBe(true);
  });

  it('publishes every dated work on the Path in a stable editorial order', () => {
    const milestones = Object.values(milestoneModules).sort((a, b) => a.order - b.order);
    expect(milestones).toHaveLength(16);
    expect(milestones.every(({ published }) => published)).toBe(true);
    expect(new Set(milestones.map(({ order }) => order).values()).size).toBe(16);
    expect(milestones.map(({ workId }) => workId)).toEqual([
      'pieces:designs-concept-art',
      'caseStudies:seekstries',
      'caseStudies:artelia',
      'pieces:hci-data-visualization',
      'caseStudies:interaction-research',
      'pieces:dashboard-design',
      'caseStudies:kpi-frameworks',
      'pieces:motion-matching-system',
      'pieces:black-hole-concept',
      'pieces:molecular-attraction',
      'pieces:texture-concept',
      'pieces:bacteria',
      'pieces:grasped',
      'pieces:mobepist-cover',
      'pieces:diversity-inclusion-report',
      'caseStudies:rebuilding-consultancy-website',
    ]);
  });

  it('keeps every authored piece connected to the published series', () => {
    const pieces = Object.values(pieceModules);
    expect(pieces).toHaveLength(11);
    expect(pieces.every(({ series }) => series === 'my-universe')).toBe(true);
  });
});
