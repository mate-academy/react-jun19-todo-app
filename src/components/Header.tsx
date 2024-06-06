import React, { useState } from 'react';
import { PropsHeader, Todo } from '../types';
import classNames from 'classnames';

export const Header: React.FC<PropsHeader> = ({ todos, setTodos }) => {
  const [query, setQuery] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (query) {
      setTodos([
        ...todos,
        { id: `${+new Date()}`, title: query.trim(), completed: false },
      ]);
    }

    setQuery('');
  }

  const isAllCompleted = todos.every((todo: Todo) => todo.completed === true);

  function handleToggle(completed: boolean) {
    switch (completed) {
      case true:
        const newList = todos.map(todo => {
          return { ...todo, completed: false };
        });

        setTodos(newList);
        break;
      case false:
        const newTodos = todos.map(todo => {
          return { ...todo, completed: true };
        });

        setTodos(newTodos);
        break;
    }
  }

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          defaultChecked={isAllCompleted === true ? true : false}
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isAllCompleted === true,
          })}
          data-cy="ToggleAllButton"
          onClick={() => handleToggle(isAllCompleted)}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={event => handleSubmit(event)}>
        <input
          ref={input => input && input.focus()}
          value={query}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={event => {
            setQuery(event.target.value.trimStart());
          }}
        />
      </form>
    </header>
  );
};
