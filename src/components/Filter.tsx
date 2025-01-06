import { FILTER_BY } from '../utils/constants/Filter';
import cl from 'classnames';
import { useFilter, useSetFilter } from '../context/FilterContext';

export const Filter = () => {
  const currentFilter = useFilter();
  const setCurrentFilter = useSetFilter();

  const getNameFilter = (str: string) => {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  };

  return (
    <nav className="filter" data-cy="Filter">
      {Object.keys(FILTER_BY).map(filter => (
        <a
          key={filter}
          href={`#/${filter === 'all' ? '' : filter}`}
          className={cl('filter__link', {
            selected: currentFilter === filter,
          })}
          data-cy={`FilterLink${getNameFilter(filter)}`}
          onClick={() => setCurrentFilter(filter)}
        >
          {getNameFilter(filter)}
        </a>
      ))}
    </nav>
  );
};
