import { useContext } from 'react';
import { StateContext, DispatchContext } from '../../context/GlobalProvider';
import classNames from 'classnames';
import { Filters } from '../../types/Filters';

export const Filter: React.FC = () => {
  const { filter: selectedFilter } = useContext(StateContext);
  const filterDispatch = useContext(DispatchContext);

  return (
    <nav className="filter" data-cy="Filter">
      {Object.values(Filters).map(filter => (
        <a
          key={filter}
          href={`#/${filter}`}
          className={classNames('filter__link', {
            selected: filter === selectedFilter,
          })}
          data-cy={`FilterLink${filter.charAt(0).toUpperCase() + filter.slice(1)}`}
          onClick={() => filterDispatch({ type: 'setFilter', payload: filter })}
        >
          {`${filter.charAt(0).toUpperCase() + filter.slice(1)}`}
        </a>
      ))}
    </nav>
  );
};
