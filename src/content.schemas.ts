import { z } from 'astro/zod';
import { DISCIPLINE_IDS } from '@/config/disciplines';

export const yearRangeSchema = z.string().min(4);
export const disciplineListSchema = z.array(z.enum(DISCIPLINE_IDS)).min(1);

const orderedWorkSchema = z.object({
  title: z.string(),
  summary: z.string().optional(),
  year: yearRangeSchema.optional(),
  disciplines: disciplineListSchema,
  coverAlt: z.string(),
  order: z.number().int().nonnegative(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
});

export const caseStudyAuthoringSchema = orderedWorkSchema.extend({
  summary: z.string(),
  client: z.string().optional(),
  context: z.string().optional(),
  role: z.string().optional(),
  tools: z.array(z.string()).min(1).optional(),
  externalUrl: z.url().optional(),
});

export const seriesAuthoringSchema = orderedWorkSchema;

export const pieceAuthoringSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  year: yearRangeSchema.optional(),
  medium: z.string(),
  client: z.string().optional(),
  disciplines: disciplineListSchema,
  imageAlt: z.string(),
  video: z.string().optional(),
  order: z.number().int().nonnegative(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
});

const milestoneBaseSchema = z.object({
  date: z.string().regex(/^\d{4}(?:-\d{2})?$/),
  order: z.number().int().nonnegative(),
  discipline: z.enum(DISCIPLINE_IDS),
  published: z.boolean().default(false),
});

const linkedMilestoneSchema = milestoneBaseSchema.extend({
  workId: z.string().regex(/^(?:caseStudies|pieces):[a-z0-9-]+$/),
}).strict();

const standaloneMilestoneSchema = milestoneBaseSchema.extend({
  title: z.string(),
  summary: z.string(),
}).strict();

export const milestoneAuthoringSchema = z.union([
  linkedMilestoneSchema,
  standaloneMilestoneSchema,
]);
