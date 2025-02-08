import React from 'react';

import { FilterType } from '../types/FilterType';
import { TodoItem } from './TodoItem';
import { useTodos } from './TodosContext';

type Props = {
  filter: FilterType;
};

export const TodoList: React.FC<Props> = ({ filter }) => {
  const { todos } = useTodos();

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case FilterType.Active:
        return !todo.completed;
      case FilterType.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
