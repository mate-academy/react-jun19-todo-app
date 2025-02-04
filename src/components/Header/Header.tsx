import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  DispatchContext,
  StateContext,
} from '../../GlobalProvider/GlobalProvider';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

export const Header = () => {
  const todos = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [todoTitle, setTodoTitle] = useState('');

  const isAllCompleted = todos.every(todo => todo.completed);
  const isVisibleBtn = todos.length > 0;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (todoTitle.trim() === '') {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: todoTitle.trim(),
      completed: false,
    };

    dispatch({ type: 'addTodo', payload: newTodo });

    setTodoTitle('');
  };

  const handleBtnToggleAll = () => {
    dispatch({ type: 'toggleAll' });
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {isVisibleBtn && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isAllCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleBtnToggleAll}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={event => setTodoTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
