export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export type FilterLink = {
  href: string;
  dataCy: string;
  title: string;
};

export enum FilterType {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}
