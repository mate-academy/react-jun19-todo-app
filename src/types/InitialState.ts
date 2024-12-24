import { Todo } from './Todo';

export type InitialState = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};
