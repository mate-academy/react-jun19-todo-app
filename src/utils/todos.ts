import { Todo } from '../types/Todo';

export const getAllTodos = (): Todo[] => {
  const items = localStorage.getItem('todos');

  if (items) {
    return JSON.parse(items);
  } else {
    localStorage.setItem('todos', JSON.stringify([]));

    return [];
  }
};

export const addTodo = (todo: Todo) => {
  const todosArray = getAllTodos();

  todosArray.push(todo);
  localStorage.setItem('todos', JSON.stringify(todosArray));
};

export const deleteTodo = (todoId: number) => {
  const todosArray = getAllTodos();
  const updatedTodos = todosArray.filter(todo => todo.id !== todoId);

  localStorage.setItem('todos', JSON.stringify(updatedTodos));
};

export const updateTodo = (updatedTodo: Todo) => {
  const todosArray = getAllTodos();
  const updatedTodos = todosArray.map(todo =>
    todo.id === updatedTodo.id ? updatedTodo : todo,
  );

  localStorage.setItem('todos', JSON.stringify(updatedTodos));
};
