import { Todo } from './Todo';

export enum FilterStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export type Filter = (todos: Todo[]) => Todo[];
