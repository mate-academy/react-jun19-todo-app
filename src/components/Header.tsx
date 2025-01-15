import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { DispatchContext, StateContext } from '../context/GlobalState';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

export function Header() {
  const [query, setQuery] = useState<string>('');

  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const hasAllCompleted = useMemo(() => {
    return (
      todos.findIndex(todo => {
        return !todo.completed;
      }) < 0
    );
  }, [todos]);

  function handleToggleStatusAll() {
    if (hasAllCompleted) {
      const updatedTodos = todos.map(todo => {
        return { ...todo, completed: !todo.completed };
      });

      dispatch({ type: 'update', payload: updatedTodos });
    }

    if (!hasAllCompleted) {
      const updatedTodos = todos.map(todo => {
        return { ...todo, completed: true };
      });

      dispatch({ type: 'update', payload: updatedTodos });
    }
  }

  function handleCreateTodo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (query.trim() !== '') {
      const todo: Todo = {
        id: +new Date(),
        title: query.trim(),
        completed: false,
      };

      const newTodosList = [...todos, todo];

      dispatch({ type: 'update', payload: newTodosList });
      setQuery('');
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos]);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}

      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: hasAllCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleStatusAll}
        />
      )}

      {/* Add a todo on form submit */}
      <form onSubmit={handleCreateTodo}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          value={query}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={e => {
            setQuery(e.target.value);
          }}
        />
      </form>
    </header>
  );
}
