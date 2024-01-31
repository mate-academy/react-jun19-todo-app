import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';

interface Props {
  items: Todo[];
}

export const TodoList: React.FC<Props> = React.memo(({ items }) => {
  return (
    <ul
      className="todo-list"
      data-cy="todosList"
    >
      {items.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
});
