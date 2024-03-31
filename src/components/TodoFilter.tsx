import classNames from 'classnames';
import React, { useContext } from 'react';
import { Filter } from '../types/Filter';
import { TodosContext } from './TodosContext';

export const TodosFilter: React.FC = () => {
  const { filter, setFilter } = useContext(TodosContext);

  return (
    <ul className="filters" data-cy="todosFilter">
      <li>
        <a
          href="#/"
          className={classNames({
            selected: filter === Filter.ALL,
          })}
          onClick={() => {
            setFilter(Filter.ALL);
          }}
        >
          All
        </a>
      </li>

      <li>
        <a
          href="#/active"
          className={classNames({
            selected: filter === Filter.ACTIVE,
          })}
          onClick={() => {
            setFilter(Filter.ACTIVE);
          }}
        >
          Active
        </a>
      </li>

      <li>
        <a
          href="#/completed"
          className={classNames({
            selected: filter === Filter.COMPLETED,
          })}
          onClick={() => {
            setFilter(Filter.COMPLETED);
          }}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};
