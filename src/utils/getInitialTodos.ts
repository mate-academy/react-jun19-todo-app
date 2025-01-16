import { Todo } from "../types/Todo";

export const getInitialTodos = (): Todo[] => {
  const savedTodos = localStorage.getItem('todos');
  return savedTodos ? JSON.parse(savedTodos) : [];
};
