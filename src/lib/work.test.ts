import { describe, expect, it } from 'vitest';
import type { ImageMetadata } from 'astro';
import { getDisciplineLabel } from '@/config/disciplines';
import { createWorkPreview, sortWorkPreviews } from './work';

const image = {} as ImageMetadata;

describe('portfolio foundations', () => {
  it('resolves discipline labels centrally', () => {
    expect(getDisciplineLabel('dataVisualization')).toBe('Data visualization');
  });

  it('maps collection-neutral preview input through the central taxonomy', () => {
    const preview = createWorkPreview({
      id: 'example',
      title: 'Example',
      disciplines: ['dataVisualization', 'userResearch'],
      image,
      imageAlt: 'Example image',
      order: 20,
      kind: 'Case study',
      href: '/work/example/',
    });

    expect(preview.disciplineLabels).toEqual(['Data visualization', 'User research']);
  });

  it('sorts unified work without mutating collection input', () => {
    const later = createWorkPreview({
      id: 'later', title: 'Later', disciplines: ['artDesign'], image,
      imageAlt: 'Later', order: 20, kind: 'Visual series', href: '/later/',
    });
    const earlier = { ...later, id: 'earlier', title: 'Earlier', order: 10 };
    const input = [later, earlier];

    expect(sortWorkPreviews(input).map(({ id }) => id)).toEqual(['earlier', 'later']);
    expect(input[0]?.id).toBe('later');
  });
});
