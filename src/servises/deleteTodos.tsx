import { Todo } from '../types/Todo';

export const deleteTodos = (
  todoId: number | null,
  array: Todo[],
  callback: (newTodos: Todo[]) => void,
) => {
  const filtered = todoId
    ? array.filter(todo => todo.id !== todoId)
    : array.filter(todo => !todo.completed);

  callback(filtered);
};

// export const clearComplited = (
//   array: Todo[],
//   callBack: (newTodos: Todo[]) => void,
// ) => {
//   const filtered = array.filter(todo => !todo.complited);

//   callBack(filtered);
// };
