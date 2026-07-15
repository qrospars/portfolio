import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import { getDisciplineLabel, type DisciplineId } from '@/config/disciplines';

export type WorkKind = 'Case study' | 'Visual series' | 'Visual study';

export interface WorkPreview {
  id: string;
  title: string;
  summary?: string;
  year?: string;
  disciplines: DisciplineId[];
  disciplineLabels: string[];
  image: ImageMetadata;
  imageAlt: string;
  order: number;
  kind: WorkKind;
  href: string;
}

export type WorkPreviewInput = Omit<WorkPreview, 'disciplineLabels'>;

const published = <T extends { data: { draft: boolean } }>(entry: T) => !entry.data.draft;

function labels(ids: DisciplineId[]): string[] {
  return ids.map(getDisciplineLabel);
}

export function createWorkPreview(input: WorkPreviewInput): WorkPreview {
  return { ...input, disciplineLabels: labels(input.disciplines) };
}

export function sortWorkPreviews(items: WorkPreview[]): WorkPreview[] {
  return [...items].sort((a, b) => a.order - b.order);
}

export async function getWorkIndex(): Promise<WorkPreview[]> {
  const [caseStudies, series] = await Promise.all([
    getCollection('caseStudies', published),
    getCollection('series', published),
  ]);

  const previews = [
    ...caseStudies.map((entry) => createWorkPreview({
      id: entry.id,
      title: entry.data.title,
      summary: entry.data.summary,
      year: entry.data.year,
      disciplines: entry.data.disciplines,
      image: entry.data.cover,
      imageAlt: entry.data.coverAlt,
      order: entry.data.order,
      kind: 'Case study',
      href: `/work/${entry.id}/`,
    })),
    ...series.map((entry) => createWorkPreview({
      id: entry.id,
      title: entry.data.title,
      summary: entry.data.summary,
      year: entry.data.year,
      disciplines: entry.data.disciplines,
      image: entry.data.cover,
      imageAlt: entry.data.coverAlt,
      order: entry.data.order,
      kind: 'Visual series',
      href: `/work/${entry.id}/`,
    })),
  ];

  return sortWorkPreviews(previews);
}

function piecePreview(entry: CollectionEntry<'pieces'>): WorkPreview {
  return createWorkPreview({
    id: entry.id,
    title: entry.data.title,
    summary: entry.data.description,
    year: entry.data.year,
    disciplines: entry.data.disciplines,
    image: entry.data.image,
    imageAlt: entry.data.imageAlt,
    order: entry.data.order,
    kind: 'Visual study',
    href: `/work/${entry.data.series.id}/#${entry.id}`,
  });
}

export async function getFeaturedWork(limit = 6): Promise<WorkPreview[]> {
  const [caseStudies, pieces] = await Promise.all([
    getCollection('caseStudies', (entry) => published(entry) && entry.data.featured),
    getCollection('pieces', (entry) => published(entry) && entry.data.featured),
  ]);

  const casePreviews = caseStudies.map((entry) => createWorkPreview({
    id: entry.id,
    title: entry.data.title,
    summary: entry.data.summary,
    year: entry.data.year,
    disciplines: entry.data.disciplines,
    image: entry.data.cover,
    imageAlt: entry.data.coverAlt,
    order: entry.data.order,
    kind: 'Case study',
    href: `/work/${entry.id}/`,
  }));

  return sortWorkPreviews([...casePreviews, ...pieces.map(piecePreview)]).slice(0, limit);
}

export async function getSeriesPieces(seriesId: string): Promise<CollectionEntry<'pieces'>[]> {
  return (await getCollection(
    'pieces',
    (entry) => published(entry) && entry.data.series.id === seriesId,
  )).sort((a, b) => a.data.order - b.data.order);
}
