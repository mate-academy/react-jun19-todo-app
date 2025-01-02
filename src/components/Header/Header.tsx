import React from 'react';
import {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useContext,
} from 'react';
import classNames from 'classnames';

import { TodosContext } from '../../Contexts/TodosContext/TodosContext';
import { ErrorContext } from '../../Contexts/ErrorContext/ErrorContext';

import { Todo } from '../../types/Todo';

type Props = {
  updateTempTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
};

export const Header: React.FC<Props> = ({ updateTempTodo }) => {
  const { manageLocalStorage, setProcessedIds, todos } =
    useContext(TodosContext);
  const { setErrorMessage } = useContext(ErrorContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const allTodosCompleted = useMemo(
    () => todos.every(todo => todo.completed),
    [todos],
  );
  const noTodos = todos.length === 0;

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const normalizeTitle = title.trim();

      if (!normalizeTitle) {
        setErrorMessage('Title should not be empty');

        return;
      }

      setLoading(true);
      const newTodo = {
        id: +new Date(),
        userId: 2042,
        title: normalizeTitle,
        completed: false,
      };

      updateTempTodo({
        ...newTodo,
        id: 0,
      });

      try {
        manageLocalStorage({ action: 'add', newItem: newTodo });
        setTitle('');
        setLoading(false);
      } catch {
        setErrorMessage('Unable to add a todo');
      } finally {
        setLoading(false);
        updateTempTodo(null);
      }
    },
    [title],
  );

  const handleTotalStatusUpdate = useCallback(() => {
    todos.forEach(todo => {
      if (!todo.completed) {
        setProcessedIds(existing => [...existing, todo.id]);
      }
    });

    try {
      manageLocalStorage({ action: 'updateStatusAll' });
    } catch {
      setErrorMessage('Unable to update all todos');
    } finally {
      setProcessedIds([]);
    }
  }, [todos]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos, loading]);

  return (
    <header className="todoapp__header">
      {!noTodos && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allTodosCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleTotalStatusUpdate}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={event => handleSubmit(event)}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
          disabled={loading}
        />
      </form>
    </header>
  );
};
