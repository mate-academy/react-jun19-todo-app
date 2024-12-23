import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 968;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const postTodo = (todo: Omit<Todo, 'id'>) => {
  return client.post<Todo>(`/todos`, todo);
};

export const deleteTodo = (todoId: number) => {
  return client.delete<Todo>(`/todos/${todoId}`);
};

export const patchTodo = (id: number, todoData: Partial<Todo>) => {
  return client.patch<Todo>(`/todos/${id}`, todoData);
};
