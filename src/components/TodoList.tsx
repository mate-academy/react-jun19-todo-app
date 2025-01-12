import { useContext, useMemo } from 'react';
import { TodoItem } from './TodoItem';
import { StateContext } from './Store';
import { Filter } from '../types/Filter';
import React from 'react';

export const TodoList = () => {
  const { todos, filter } = useContext(StateContext);

  const preparedTodos = useMemo(() => {
    if (filter === Filter.Active) {
      return todos.filter(todo => !todo.completed);
    }

    if (filter === Filter.Completed) {
      return todos.filter(todo => todo.completed);
    }

    return todos;
  }, [todos, filter]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {preparedTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
