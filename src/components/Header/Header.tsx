import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../../context/AppProvider';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const { todos, setTodos, title, setTitle, isEditingId } = useAppContext();
  const allTodoCompleted = todos.every(todo => todo.completed);

  const focus = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isEditingId) {
      focus.current?.focus();
    }
  }, [isEditingId, todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = { id: Date.now(), title: text, completed: false };

    setTodos([...todos, newTodo]);
    localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    addTodo(title.trim());
    setTitle('');
  };

  const handleMainInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const toggleAllTodos = () => {
    const areAllCompleted = todos.every(todo => todo.completed);

    const toggledTodos = todos.map(todo => ({
      ...todo,
      completed: !areAllCompleted,
    }));

    setTodos(toggledTodos);
    localStorage.setItem('todos', JSON.stringify(toggledTodos));
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}

      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allTodoCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAllTodos}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleMainInput}
          ref={focus}
        />
      </form>
    </header>
  );
};
