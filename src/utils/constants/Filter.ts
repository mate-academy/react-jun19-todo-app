export const FILTER_BY = {
  all: 'all',
  completed: 'completed',
  active: 'active',
} as const;

export type Filter = keyof typeof FILTER_BY;
