import React, { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { FilterBy } from '../types/FilterBy';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const { todos, filterBy } = useContext(TodoContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map((todo: Todo) => {
        if (FilterBy[filterBy] === 'ACTIVE' && !todo.completed) {
          return <TodoItem key={todo.id} item={todo} />;
        }

        if (FilterBy[filterBy] === 'COMPLETED' && todo.completed) {
          return <TodoItem key={todo.id} item={todo} />;
        }

        if (FilterBy[filterBy] === 'ALL') {
          return <TodoItem key={todo.id} item={todo} />;
        }

        return;
      })}
    </section>
  );
};
