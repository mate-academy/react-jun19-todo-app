import { Todo } from '../types/Todo';

export const getAllTodos = (): Todo[] => {
  const todos: Todo[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key) {
      const item = localStorage.getItem(key);

      if (item) {
        const todo: Todo = JSON.parse(item);

        todos.push(todo);
      }
    }
  }

  return todos.sort((todo1, todo2) => todo1.id - todo2.id);
};

export const addTodo = (todo: Todo) => {
  localStorage.setItem(`${todo.id}`, JSON.stringify(todo));
};

export const deleteTodo = (todoId: number) => {
  localStorage.removeItem(`${todoId}`);
};

export const updateTodo = (updatedTodo: Todo) => {
  localStorage.removeItem(`${updatedTodo.id}`);
  localStorage.setItem(`${updatedTodo.id}`, JSON.stringify(updatedTodo));
};
