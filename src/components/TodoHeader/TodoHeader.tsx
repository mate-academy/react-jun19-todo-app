import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Action } from '../../types/Action';
import { ActionType } from '../../types/ActionType';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  dispatch: (action: Action) => void;
}

export const TodoHeader: React.FC<Props> = ({ todos, dispatch }) => {
  const [query, setQuery] = useState('');
  const refInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (refInput.current) {
      refInput.current.focus();
    }
  }, []);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (query.trim() !== '') {
      const newTodo: Todo = {
        id: +new Date(),
        title: query,
        completed: false,
      };

      dispatch({ type: ActionType.Add, payload: newTodo });
      setQuery('');
    }
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: todos?.every(todo => todo.completed),
        })}
        data-cy="ToggleAllButton"
        onClick={() => dispatch({ type: ActionType.AllCompleted })}
      />

      <form onSubmit={onSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          ref={refInput}
          onChange={e => setQuery(e.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};
