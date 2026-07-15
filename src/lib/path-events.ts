import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import { getDisciplineLabel, type DisciplineId } from '@/config/disciplines';
import { withBase } from '@/lib/urls';
import type { WorkKind } from '@/lib/work';

export interface TimelineEvent {
  id: string;
  date: string;
  displayDate: string;
  order: number;
  discipline: DisciplineId;
  secondaryDisciplines: DisciplineId[];
  disciplineLabels: string[];
  title: string;
  kind: WorkKind | 'Milestone';
  image?: ImageMetadata;
  imageAlt?: string;
  href?: string;
}

type LinkedWork =
  | { collection: 'caseStudies'; entry: CollectionEntry<'caseStudies'> }
  | { collection: 'pieces'; entry: CollectionEntry<'pieces'> };

function splitWorkId(workId: string): { collection: 'caseStudies' | 'pieces'; id: string } {
  const [collection, id] = workId.split(':');
  if ((collection !== 'caseStudies' && collection !== 'pieces') || !id) {
    throw new Error(`Invalid Path work reference: ${workId}`);
  }
  return { collection, id };
}

function resolveLinkedEvent(
  milestone: CollectionEntry<'milestones'>,
  linkedWork: LinkedWork,
): TimelineEvent {
  const { data } = linkedWork.entry;
  if (!data.disciplines.includes(milestone.data.discipline)) {
    throw new Error(
      `Path milestone ${milestone.id} uses ${milestone.data.discipline}, which is not attached to ${linkedWork.collection}:${linkedWork.entry.id}`,
    );
  }

  const secondaryDisciplines = data.disciplines.filter(
    (discipline) => discipline !== milestone.data.discipline,
  );
  const base = {
    id: milestone.id,
    date: milestone.data.date,
    displayDate: data.year ?? milestone.data.date,
    order: milestone.data.order,
    discipline: milestone.data.discipline,
    secondaryDisciplines,
    disciplineLabels: data.disciplines.map(getDisciplineLabel),
    title: data.title,
  };

  if (linkedWork.collection === 'caseStudies') {
    return {
      ...base,
      kind: 'Case study',
      image: linkedWork.entry.data.cover,
      imageAlt: linkedWork.entry.data.coverAlt,
      href: withBase(`/work/${linkedWork.entry.id}/`),
    };
  }

  return {
    ...base,
    kind: 'Visual study',
    image: linkedWork.entry.data.image,
    imageAlt: linkedWork.entry.data.imageAlt,
    href: withBase(`/work/${linkedWork.entry.data.series.id}/#${linkedWork.entry.id}`),
  };
}

export function sortTimelineEvents(events: TimelineEvent[]): TimelineEvent[] {
  return [...events].sort((a, b) => {
    const dateDifference = Date.parse(`${a.date}-01`) - Date.parse(`${b.date}-01`);
    return dateDifference || a.order - b.order;
  });
}

export async function getPathEvents(): Promise<TimelineEvent[]> {
  const [milestones, caseStudies, pieces] = await Promise.all([
    getCollection('milestones', ({ data }) => data.published),
    getCollection('caseStudies', ({ data }) => !data.draft),
    getCollection('pieces', ({ data }) => !data.draft),
  ]);
  const casesById = new Map(caseStudies.map((entry) => [entry.id, entry]));
  const piecesById = new Map(pieces.map((entry) => [entry.id, entry]));

  const events = milestones.map((milestone): TimelineEvent => {
    if ('workId' in milestone.data) {
      const reference = splitWorkId(milestone.data.workId);
      const entry = reference.collection === 'caseStudies'
        ? casesById.get(reference.id)
        : piecesById.get(reference.id);
      if (!entry) {
        throw new Error(`Path milestone ${milestone.id} references missing work ${milestone.data.workId}`);
      }
      return resolveLinkedEvent(
        milestone,
        reference.collection === 'caseStudies'
          ? { collection: 'caseStudies', entry: entry as CollectionEntry<'caseStudies'> }
          : { collection: 'pieces', entry: entry as CollectionEntry<'pieces'> },
      );
    }

    return {
      id: milestone.id,
      date: milestone.data.date,
      displayDate: milestone.data.date,
      order: milestone.data.order,
      discipline: milestone.data.discipline,
      secondaryDisciplines: [],
      disciplineLabels: [getDisciplineLabel(milestone.data.discipline)],
      title: milestone.data.title,
      kind: 'Milestone',
    };
  });

  return sortTimelineEvents(events);
}
