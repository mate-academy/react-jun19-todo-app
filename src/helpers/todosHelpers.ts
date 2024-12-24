import { Todo } from '../types/Todo';
import { Field } from '../types/Field';

export const filteredTodos = (todos: Todo[], field: Field) => {
  const changedTodos = [...todos];

  switch (field) {
    case Field.COMPLETED:
      return changedTodos.filter(todo => todo.completed);
    case Field.ACTIVE:
      return changedTodos.filter(todo => !todo.completed);
    default:
      return changedTodos;
  }
};

export const buttons = [Field.ALL, Field.ACTIVE, Field.COMPLETED];

export const filterByTodos = (todos: Todo[]) => {
  return todos.filter(todo => !todo.completed);
};
