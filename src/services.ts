import { Todo } from './types/Todo';

export const getActiveTodosArray = (todos: Todo[]) => {
  return todos.filter((todo: Todo) => !todo.completed);
};

export const getCompletedTodosArray = (todos: Todo[]) => {
  return todos.filter((todo: Todo) => todo.completed);
};
