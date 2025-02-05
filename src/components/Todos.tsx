import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../Storage/storageFiles';
import { TodoItem } from './Todo';

export const Todos = () => {
  const dispatch = useContext(DispatchContext);
  const { todos, useTodos } = useContext(StateContext);

  const handleFormSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    todoId: number,
  ) => {
    e.preventDefault();
    dispatch({ type: 'setChanged', id: todoId });
  };

  const handleKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement>,
    todoId: number,
  ) => {
    if (e.key === 'Escape') {
      dispatch({ type: 'escapeChangedText', id: todoId });
      dispatch({ type: 'setChanged', id: todoId });
    }
  };

  const todosFilter = todos.filter(todo => {
    if (useTodos === 'Active') {
      return !todo.completed;
    }

    if (useTodos === 'Completed') {
      return todo.completed;
    }

    return true;
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todosFilter.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleKeyUp={handleKeyUp}
          handleFormSubmit={handleFormSubmit}
        />
      ))}
    </section>
  );
};
