import { Todo } from '../../types/Todo';
import { TodoStatus } from '../../types/Status';

export const filterTodos = (todos: Todo[], status: TodoStatus) => {
  const todosCopy = [...todos];

  switch (status) {
    case TodoStatus.active:
      return todosCopy.filter(todo => !todo.completed);
    case TodoStatus.completed:
      return todosCopy.filter(todo => todo.completed);
    case TodoStatus.all:
      return todosCopy;
  }
};

export const capitalizeFirstLetter = (value: TodoStatus) => {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
};

export const filterOptions = Object.values(TodoStatus);
