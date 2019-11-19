import React from 'react';
import PropTypes from 'prop-types';

function TodosFilter({ todosFilter, selectedPage }) {
  return (
    <ul className="filters">
      <li>
        <a
          onClick={todosFilter}
          href="#/"
          className={selectedPage === 'All' ? 'selected' : ''}
        >
          All
        </a>
      </li>

      <li>
        <a
          onClick={todosFilter}
          href="#/active"
          className={selectedPage === 'Active' ? 'selected' : ''}
        >
          Active
        </a>
      </li>

      <li>
        <a
          onClick={todosFilter}
          href="#/completed"
          className={selectedPage === 'Completed' ? 'selected' : ''}
        >
          Completed
        </a>
      </li>
    </ul>
  );
}

TodosFilter.propTypes = {
  todosFilter: PropTypes.func.isRequired,
  selectedPage: PropTypes.string.isRequired,
};

export default TodosFilter;
