/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/semi */

import React from 'react';
import { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  todos: Todo[]
  deleteTodo: (id: string) => void
  toggleTodoStatus: (id: string) => void
};

export const TodoList: React.FC<Props> = ({
  todos,
  deleteTodo,
  toggleTodoStatus,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => (
        <TodoItem
          todos={todos}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleTodoStatus={toggleTodoStatus}
        />
      ))}
    </ul>
  )
}
