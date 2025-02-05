import { Filter } from './Filter';
import { Todo } from './Todo';

export interface State {
  todos: Todo[];
  filter: Filter;
}
