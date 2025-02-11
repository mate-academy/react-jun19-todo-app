// import { Todo } from '../types/Todo';
// import { client } from '../utils.ts/fetchClient';

// export const USER_ID = 2188;

// export const getTodos = () => {
//   return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
// };

// export const postTodo = (newTodo: Omit<Todo, 'id'>) => {
//   return client.post<Todo>(`/todos?userId=${USER_ID}`, newTodo);
// };

// export const updateTodo = (updatedData: Todo) => {
//   return client.patch<Todo>(`/todos/${updatedData.id}`, updatedData);
// };

// export const deleteTodo = (todoId: number) => {
//   return client.delete(`/todos/${todoId}`);
// };
