import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import {
  caseStudyAuthoringSchema,
  milestoneAuthoringSchema,
  pieceAuthoringSchema,
  seriesAuthoringSchema,
} from './content.schemas';

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/case-studies' }),
  schema: ({ image }) => caseStudyAuthoringSchema.extend({
    cover: image(),
  }),
});

const series = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/series' }),
  schema: ({ image }) => seriesAuthoringSchema.extend({
    cover: image(),
  }),
});

const pieces = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/pieces' }),
  schema: ({ image }) => pieceAuthoringSchema.extend({
    image: image(),
    series: reference('series'),
  }),
});

const milestones = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/milestones' }),
  schema: milestoneAuthoringSchema,
});

export const collections = { caseStudies, series, pieces, milestones };
