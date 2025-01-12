/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/quotes */ import React from 'react';
import '../styles/todo-list.css';

import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';
type Props = { todos: Todo[] };
export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
