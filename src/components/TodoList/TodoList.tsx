import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  filteredTodos: Todo[];
};

export const TodoList: React.FC<Props> = ({ filteredTodos }) => (
  <section className="todoapp__main" data-cy="TodoList">
    {filteredTodos.map((todo: Todo) => (
      <TodoItem key={todo.id} todo={todo} />
    ))}
  </section>
);
