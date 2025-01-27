import React, { useContext } from 'react';
import cn from 'classnames';
import Form from './Form';
import { DispatchContext, StateContext } from '../Store';
import { Actions } from '../types/Todo';

const Header: React.FC = () => {
  const { allTodos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const isAllCompleted = allTodos.every(todo => todo.completed);

  const handleToggleAll = () => {
    if (dispatch) {
      dispatch({ type: Actions.ToggleAllTodos });
    }
  };

  return (
    <header className="todoapp__header">
      {allTodos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: isAllCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}
      <Form />
    </header>
  );
};

export default Header;
