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

import { addTodo, updateTodo } from '../../api/todos';
import { TodosContext } from '../../Contexts/TodosContext/TodosContext';
import { ErrorContext } from '../../Contexts/ErrorContext/ErrorContext';

import { Todo } from '../../types/Todo';

type Props = {
  updateTempTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
};

export const Header: React.FC<Props> = ({ updateTempTodo }) => {
  const { setTodos, setProcessedIds, todos } = useContext(TodosContext);
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
        userId: 2042,
        title: normalizeTitle,
        completed: false,
      };

      updateTempTodo({
        id: 0,
        ...newTodo,
      });

      addTodo(newTodo)
        .then(response => {
          setTitle('');
          setTodos(existing => [...existing, response]);
          setLoading(false);
        })
        .catch(() => setErrorMessage('Unable to add a todo'))
        .finally(() => {
          setLoading(false);
          updateTempTodo(null);
        });
    },
    [title],
  );

  const handleTotalStatusUpdate = useCallback(() => {
    if (!allTodosCompleted) {
      todos.forEach(todo => {
        if (!todo.completed) {
          setProcessedIds(existing => [...existing, todo.id]);
          const toUpdate = { completed: true };

          updateTodo(todo.id, toUpdate)
            .then(() => {
              setTodos(existing =>
                existing.map(el =>
                  el.id === todo.id
                    ? { ...el, completed: toUpdate.completed }
                    : el,
                ),
              );
            })
            .catch(() => setErrorMessage('Unable to update a todo'))
            .finally(() => {
              setProcessedIds(existing =>
                existing.filter(id => id !== todo.id),
              );
            });
        }
      });
    }

    if (allTodosCompleted) {
      todos.forEach(todo => {
        setLoading(true);
        setProcessedIds(existing => [...existing, todo.id]);
        const toUpdate = { completed: false };

        updateTodo(todo.id, toUpdate)
          .then(() => {
            setTodos(existing =>
              existing.map(el =>
                el.id === todo.id
                  ? { ...el, completed: toUpdate.completed }
                  : el,
              ),
            );
          })
          .catch(() => setErrorMessage('Unable to update a todo'))
          .finally(() => {
            setLoading(false);
            setProcessedIds(existing => existing.filter(id => id !== todo.id));
          });
      });
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
