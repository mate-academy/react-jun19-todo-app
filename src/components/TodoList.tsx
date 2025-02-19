import React, { useContext } from 'react';
import { FilterBy, Todo, TodoContext } from '../contexts/TodoContext';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const { todos, filterBy } = useContext(TodoContext);

  return (
    <div data-cy="Todo" className="todo">
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
    </div>
  );
};
