import { useContext } from 'react';
import { StateContext, DispatchContext } from '../../context/GlobalProvider';

export const ClearCompletedButton: React.FC = () => {
  const clearAllCompleted = useContext(DispatchContext);
  const { todos } = useContext(StateContext);

  const isSomeTodosCompleted = todos.some(todo => todo.completed);

  return (
    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      onClick={() => clearAllCompleted({ type: 'clearCompletedTodos' })}
      disabled={!isSomeTodosCompleted}
    >
      Clear completed
    </button>
  );
};
