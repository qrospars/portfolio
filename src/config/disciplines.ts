export const DISCIPLINES = {
  artDesign: { label: 'Art & design', order: 10 },
  generativeArt: { label: 'Generative art', order: 20 },
  dataVisualization: { label: 'Data visualization', order: 30 },
  productUx: { label: 'Product & UX', order: 40 },
  userResearch: { label: 'User research', order: 50 },
  aiAgents: { label: 'AI agents', order: 60 },
  dataStrategy: { label: 'Data strategy', order: 70 },
  cro: { label: 'CRO', order: 80 },
  marketing: { label: 'Marketing', order: 90 },
  traditionalArt: { label: 'Traditional art', order: 100 },
} as const;

export const DISCIPLINE_IDS = Object.keys(DISCIPLINES) as [
  keyof typeof DISCIPLINES,
  ...(keyof typeof DISCIPLINES)[],
];

export type DisciplineId = keyof typeof DISCIPLINES;

export function getDisciplineLabel(id: DisciplineId): string {
  return DISCIPLINES[id].label;
}
