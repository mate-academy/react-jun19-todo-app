import { FilterType } from './FilterType';
import { Todo } from './Todo';

export type State = {
  filter: FilterType;
  todos: Todo[];
};
