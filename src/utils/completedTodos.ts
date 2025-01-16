import { Todo } from '../types/Todo';

export const completedTodos = (todos: Todo[]) => todos.filter(t => t.completed);

export const activeTodos = (todos: Todo[]) => todos.filter(t => !t.completed);
