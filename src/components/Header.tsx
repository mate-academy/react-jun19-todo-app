import React, { useEffect, useRef, useState } from 'react';
import { useLocalStorageContext } from '../context/context';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

export const Header = () => {
  const { todos, save } = useLocalStorageContext();
  const [title, setTitle] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const areAllCompleted = todos.every(todo => todo.completed);

  useEffect(() => {
    input.current?.focus();
  }, [todos]);

  const onToggle = () => {
    const newTodos = todos.map(todo => ({
      ...todo,
      completed: !areAllCompleted,
    }));

    save(newTodos);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: normalizedTitle,
      completed: false,
    };

    save((previous: Todo[]) => [...previous, newTodo]);

    setTitle('');
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 ? (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: areAllCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={onToggle}
        />) : null}

      <form onSubmit={onSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          value={title}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={input}
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
