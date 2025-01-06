// import { Todo } from '../types/Todo';

const STORAGE_KEY = 'todos';

export const getTodos = () => {
  const value = localStorage.getItem(STORAGE_KEY);

  if (!value) {
    return [];
  }

  const parsedValue = JSON.parse(value);

  return Array.isArray(parsedValue) ? parsedValue : [];
};
