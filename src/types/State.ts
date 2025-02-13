import { Filter } from './Filter';
import { Todo } from './Todo';

export type State = {
  todos: Todo[];
  newTodoTitle: string;
  status: Filter;
  filter: Filter;
};
