import { useContext } from 'react';
import { StateContext, DispatchContext } from '../../context/GlobalProvider';
import classNames from 'classnames';

export const ToggleAllButton: React.FC = () => {
  const toggleAll = useContext(DispatchContext);
  const { todos } = useContext(StateContext);

  const allTodosCompleted = todos.every(todo => todo.completed);

  const handleToggleAll = () => {
    toggleAll({ type: 'toggleAllTodos', payload: !allTodosCompleted });
  };

  return (
    <button
      type="button"
      className={classNames('todoapp__toggle-all', {
        active: allTodosCompleted,
      })}
      data-cy="ToggleAllButton"
      onClick={handleToggleAll}
    />
  );
};
