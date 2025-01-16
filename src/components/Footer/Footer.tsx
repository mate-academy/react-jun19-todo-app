import React, { useContext } from 'react';
import { FilterType } from '../../types/FilterType';
import cn from 'classnames';
import { StateContext, DispatchContext } from '../GlobalStateProvider/GlobalStateProvider';


type FooterProps = {
  filterBy: FilterType;
  todosCounter: number;
  handleSetFilter: (filter: FilterType) => void;
};

const Footer: React.FC<FooterProps> = React.memo(({ todosCounter, filterBy, handleSetFilter}) => {

    const {todos} = useContext(StateContext);
    const dispatch = useContext(DispatchContext);
    const itemsLeftText = `${todosCounter} ${todosCounter === 1 ? 'item left' : 'items left'}`;
    const isDisabled = !todos.some((todo) => todo.completed);


    return (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {itemsLeftText}
        </span>

        <nav className="filter" data-cy="Filter">

          {Object.values(FilterType).map((filterOption) => (
            <a
              href={`#/${filterOption}`}
              key={filterOption}
              className={cn("filter__link", {
                "selected": filterBy === filterOption,
              })}
              data-cy={`FilterLink${filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}`}
              onClick={() => handleSetFilter(filterOption)}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          disabled={isDisabled}
          onClick={() => dispatch({ type: 'deleteCompletedTodos' })}
        >
          Clear completed
        </button>
      </footer>
    );
  },
);

Footer.displayName = 'Footer';
export default Footer;
