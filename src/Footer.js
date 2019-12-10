import React from 'react';
import PropTypes from 'prop-types';

function Footer({
  tasks, filterBy, currentFilter, clearCompletedAll,
}) {
  return (
    <footer className="footer">
      <span className="todo-count">
        {tasks.filter(item => !item.completed).length}
        {' '}
active items
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={currentFilter === 'All' && 'selected'}
            onClick={() => filterBy('All')}
          >
            All
          </a>
        </li>

        <li>
          <a
            className={currentFilter === 'Active' && 'selected'}
            href="#/active"
            onClick={() => filterBy('Active')}
          >
            Active
          </a>
        </li>

        <li>
          <a
            className={currentFilter === 'Completed' && 'selected'}
            onClick={() => filterBy('Completed')}
            href="#/completed"
          >
            Completed
          </a>
        </li>

        <li>
          <a
            onClick={clearCompletedAll}
            href="#/clear-completed"
          >
            Clear all completed
          </a>
        </li>
      </ul>
    </footer>
  );
}

Footer.propTypes = {
  tasks: PropTypes.objectOf.isRequired,
  filterBy: PropTypes.func.isRequired,
  currentFilter: PropTypes.func.isRequired,
  clearCompletedAll: PropTypes.func.isRequired,
};

export default Footer;
