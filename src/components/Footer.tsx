import React from 'react';

import { Actions, Filters } from '../types/Todo';
import FilterButton from './FilterButton';
import { DispatchContext, StateContext } from '../Store';

const Footer: React.FC = ({}) => {
  const { allTodos } = React.useContext(StateContext);
  const activeTodos = allTodos.filter(todo => !todo.completed);
  const dispatch = React.useContext(DispatchContext);

  const handleClearCompleted = () => {
    if (dispatch) {
      dispatch({ type: Actions.ClearCompleted });
    }
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Filters).map(filterItem => {
          return <FilterButton key={filterItem} filterItem={filterItem} />;
        })}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={allTodos.every(todo => !todo.completed)}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
