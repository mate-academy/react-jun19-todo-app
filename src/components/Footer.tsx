import cn from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { DispatchContext, StateContext } from '../Store';
import { Filter } from '../types/Filter';

export const Footer = () => {
  const { todos, filter } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [itemsLeft, setItemsLeft] = useState(0);
  const [hasCompletedTodos, setHasCompletedTodos] = useState(false);

  useEffect(() => {
    const remainingItems = todos.filter(todo => !todo.completed).length;
    const isTodoCompleted = todos.some(todo => todo.completed);

    setItemsLeft(remainingItems);
    setHasCompletedTodos(isTodoCompleted);
  }, [todos]);

  const handleFilterChange = (value: Filter) => {
    dispatch({ type: 'setFilter', payload: value });
  };

  const handleClearCompleted = async () => {
    dispatch({ type: 'clearCompleted' });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {itemsLeft} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(value => (
          <a
            key={value}
            href={value === Filter.ALL ? '#/' : `#/${value}`}
            className={cn('filter__link', { selected: filter === value })}
            data-cy={`FilterLink${value.charAt(0).toUpperCase() + value.slice(1)}`}
            onClick={() => handleFilterChange(value)}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
        disabled={!hasCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
