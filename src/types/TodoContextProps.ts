import { FilterBy } from './FilterBy';
import { Todo } from './Todo';

export type TodoContextProps = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  title: string;
  setTitle: (title: string) => void;
  activeItem: string;
  setActiveItem: (activeItem: string) => void;
  filterBy: FilterBy;
  setFilterBy: (filterBy: FilterBy) => void;
  disabled: boolean;
};
