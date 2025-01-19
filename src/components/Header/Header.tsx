import classNames from 'classnames';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import { DispatchContext, StateContext } from '../../Store';

export const Header = () => {
  const dispatch = useContext(DispatchContext);
  const { activeCount, todos, formField } = useContext(StateContext);

  const [title, setTitle] = useState('');

  useEffect(() => {
    formField.current?.focus();
  }, [formField]);

  const trimmedTitle = title.trim();

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      if (!trimmedTitle) {
        return;
      }

      dispatch({ type: 'createTodo', payload: trimmedTitle });
      formField.current?.focus();
      setTitle('');
    },
    [dispatch, formField, trimmedTitle],
  );

  return (
    <header className="todoapp__header">
      {todos.length !== 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: !activeCount,
          })}
          data-cy="ToggleAllButton"
          onClick={() => dispatch({ type: 'toggleAll' })}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={formField}
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
