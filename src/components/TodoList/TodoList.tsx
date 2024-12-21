import React from 'react';

import { TodoItem } from '../TodoItem/TodoItem';

import { Todo } from '../../types/Todo';

type Props = {
  filteredTodos: Todo[];
};

export const TodoList: React.FC<Props> = ({ filteredTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => {
        const { id, completed, title } = todo;

        return (
          <TodoItem key={id} todoId={id} completed={completed} title={title} />
        );
      })}
    </section>
  );
};
