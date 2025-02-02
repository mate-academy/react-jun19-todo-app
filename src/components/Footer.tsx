import { FilterStatus } from '../types/FilterStatus';
import { useContext, useMemo } from 'react';
import { DispatchContext, StateContext } from '../store/Store';
import { FilterItem } from './FilterItem';

export const Footer: React.FC = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const todosActiveQuantity = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  const todosComplitedQuantity = useMemo(
    () => todos.filter(todo => todo.completed).length,
    [todos],
  );

  const clearAllComplitedTodos = () => {
    dispatch({ type: 'clearAllComplitedTodos' });
  };

  const handleFilterClick = (status: FilterStatus) => {
    dispatch({ type: 'setFilterStatus', payload: status });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosActiveQuantity} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(FilterStatus).map(status => {
          return (
            <FilterItem
              key={status}
              onClick={handleFilterClick}
              status={status}
            />
          );
        })}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todosComplitedQuantity === 0}
        onClick={clearAllComplitedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
