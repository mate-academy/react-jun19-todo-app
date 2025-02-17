import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { DispatchContext, StateContext } from '../context/TodosContext';
import classNames from 'classnames';

export const TodoHeader: React.FC = () => {
  const [title, setTitle] = useState('');
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeTodos = useMemo(
    () => todos.filter(todo => !todo.completed),
    [todos],
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: title.trim(),
      completed: false,
    };

    dispatch({
      type: 'addTodo',
      payload: newTodo,
    });

    setTitle('');
  };

  const handleToggleAll = () => {
    if (!todos.length) {
      return;
    }

    if (activeTodos.length === todos.length || activeTodos.length === 0) {
      dispatch({
        type: 'toggleTodos',
        payload: [...todos],
      });
    }

    dispatch({
      type: 'toggleTodos',
      payload: activeTodos,
    });
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: activeTodos.length === 0,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleFormSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          ref={inputRef}
        />
      </form>
    </header>
  );
};
