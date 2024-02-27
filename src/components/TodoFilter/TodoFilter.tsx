import { useContext } from 'react';
import cn from 'classnames';
import { Status } from '../../types';
import { TodoContext } from '../TodoContext';

export const TodoFilter = () => {
  const { filterStatus, setFilterStatus } = useContext(TodoContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href={Status.All}
          className={cn({ selected: filterStatus === Status.All })}
          onClick={() => setFilterStatus(Status.All)}
        >
          All
        </a>
      </li>

      <li>
        <a
          href={Status.Active}
          className={cn({ selected: filterStatus === Status.Active })}
          onClick={() => setFilterStatus(Status.Active)}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href={Status.Completed}
          className={cn({ selected: filterStatus === Status.Completed })}
          onClick={() => setFilterStatus(Status.Completed)}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
