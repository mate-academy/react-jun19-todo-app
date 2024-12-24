import React, { useContext } from 'react';
import { Form } from './Form';

import cn from 'classnames';

import { TodoContext } from '../store/TodoContext';

const Header: React.FC = () => {
  const { todos, changeCompleteAll, completedTodosLength } =
    useContext(TodoContext);

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          onClick={changeCompleteAll}
          type="button"
          className={cn('todoapp__toggle-all', {
            active: !completedTodosLength,
          })}
          data-cy="ToggleAllButton"
        />
      )}

      <Form />
    </header>
  );
};

export default React.memo(Header);
