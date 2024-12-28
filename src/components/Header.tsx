import React, { useContext, useEffect, useRef, useState } from 'react';
import { TodosContext } from '../context/TodosContex';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

export const Header: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const [title, setTitle] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos]);

  const checkActiveTodos = (): boolean => {
    if (todos.length > 0) {
      return todos.every(todo => todo.completed);
    }

    return false;
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

    setTodos([...todos, newTodo]);
    setTitle('');
  };

  const toggleAll = () => {
    const allCompleted = checkActiveTodos();

    const toggledTodos = todos.map(todo => ({
      ...todo,
      completed: allCompleted ? false : true,
    }));

    setTodos(toggledTodos);
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: checkActiveTodos(),
          })}
          onClick={toggleAll}
          data-cy="ToggleAllButton"
        />
      )}

      <form onSubmit={event => onSubmit(event)}>
        <input
          data-cy="NewTodoField"
          ref={inputRef}
          value={title}
          onChange={event => setTitle(event.target.value)}
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
