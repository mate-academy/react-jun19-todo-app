import React, { useContext, useEffect, useRef } from 'react';
import { Todo } from '../../types/Todos';
import classNames from 'classnames';
import { TodosContext } from '../../TodoContext/TodoContext';

type Props = {
  updateAll: () => void;
};

export const Header: React.FC<Props> = ({ updateAll }) => {
  const inputField = useRef<HTMLInputElement>(null);
  const { todos, setTodos } = useContext(TodosContext);

  useEffect(() => {
    if (inputField.current) {
      inputField.current.focus();
    }
  }, [todos]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const inputValue = inputField.current?.value.trim();

    if (!inputValue) {
      return;
    }

    if (inputField.current) {
      inputField.current.value = '';
    }

    if (inputValue) {
      const newTodo: Todo = {
        id: +new Date(),
        title: inputValue,
        userId: 1139,
        completed: false,
      };

      setTodos([...todos, newTodo]);
    }
  };

  const allTodosCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allTodosCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={updateAll}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={inputField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
