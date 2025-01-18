/* eslint-disable no-param-reassign */
import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import './TodoApp.scss';

import { TodoContext } from '../store/TodoContext';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

export const Header = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const [title, setTitle] = useState('');

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleField.current?.focus();
  }, [todos]);

  const isAllTodosCompleted =
    todos.filter(t => t.completed === true).length === todos.length
      ? true
      : false;

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function onFormSubmit(event: FormEvent) {
    event.preventDefault();
    if (!title.trim()) {
      setTitle('');

      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: title.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);

    setTitle('');
  }

  function handleToggleAll() {
    if (isAllTodosCompleted) {
      todos.forEach(t => {
        t.completed = false;
      });
    } else {
      todos.forEach(t => {
        t.completed = true;
      });
    }

    setTodos([...todos]);
  }

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length && (
        <button
          className={classNames('todoapp__toggle-all', {
            active: isAllTodosCompleted,
          })}
          type="button"
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={onFormSubmit}>
        <input
          autoFocus
          value={title}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={handleTitleChange}
          ref={titleField}
        />
      </form>
    </header>
  );
};
