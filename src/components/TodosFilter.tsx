import cn from 'classnames';
import { useContext } from 'react';
import { DispatchContext } from './TodosContext';
import { Status } from '../types/Status';

export const TodoFilter = () => {
  const dispatch = useContext(DispatchContext);

  const filters = Object.values(Status);

  const handleFilter = (filterBy: Status) => {
    dispatch({
      type: 'filter',
      payload: filterBy,
    });
  };

  return (
    <ul className="filters">
      {
        filters.map(filter => {
          const filterName = filter[0].toUpperCase() + filter.slice(1);

          return (
            <li key={filter}>
              <a
                href={`#/${filter === 'all' ? '' : filter}`}
                className={
                  cn({
                    selected: true,
                  })
                }
                onClick={() => handleFilter(filter)}
              >
                {filterName}
              </a>
            </li>
          );
        })
      }
    </ul>
  );
};
