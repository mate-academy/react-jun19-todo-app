import { Todo } from '../types/Todo';

export const getLocaleStorageTodos = (): Todo[] => {
  const localStorageTodos = localStorage.getItem('todos');

  return localStorageTodos ? JSON.parse(localStorageTodos) : [];
};

export const setLocaleStorageTodos = (todos: Todo[]) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};
