export const FilterTypes = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
} as const;

export type FilterType = typeof FilterTypes[keyof typeof FilterTypes];


