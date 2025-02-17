import { Todo } from '../types/Todo';

export const updateTodosInLocalStorage = (todos: Todo[]) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

export const getTodosFromLocalStorage = () => {
  const todos = localStorage.getItem('todos');

  return todos ? (JSON.parse(todos) as Todo[]) : ([] as Todo[]);
};
