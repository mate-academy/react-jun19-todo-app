import React, { useState, useRef, useEffect } from 'react';
import { useTodos } from '../../TodosContext';
import classNames from 'classnames';

export const Header = () => {
  const { todos, dispatch } = useTodos();
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInputField = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos]);

  const allCompleted = todos.every(todo => todo.completed);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
  };

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (newTodoTitle.trim()) {
      dispatch({ type: 'ADD_TODO', title: newTodoTitle.trim() });
      setNewTodoTitle('');
      focusInputField();
    }
  };

  const handleToggleAll = () => {
    dispatch({ type: 'TOGGLE_ALL' });
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}
      <form onSubmit={handleAddTodo}>
        <input
          value={newTodoTitle}
          onChange={handleChange}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={inputRef}
        />
      </form>
    </header>
  );
};
