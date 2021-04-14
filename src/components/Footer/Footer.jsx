import React, { useReducer } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export const Footer = React.memo(
  ({ gettodosActiveTodosLength, filterTodos, clearAllCompleted }) => {
    const reducer = (_, actions) => {
      switch (actions) {
        case 'all':
          return 'all';

        case 'active':
          return 'active';

        case 'completed':
          return 'completed';

        default:
          return '';
      }
    };

    const [isActive, dispatch] = useReducer(reducer, '');

    const selectAll = () => {
      dispatch('all');
      filterTodos();
    };

    const selectActive = () => {
      dispatch('active');
      filterTodos(false);
    };

    const selectComplited = () => {
      dispatch('completed');
      filterTodos(true);
    };

    return (
      <footer className="footer">
        <span className="todo-count">
          {`${gettodosActiveTodosLength()} items left`}
        </span>

        <ul className="filters">
          <li>
            <a
              href="#/"
              onClick={selectAll}
              className={classnames({ selected: isActive === 'all' })}
            >
              All
            </a>
          </li>

          <li>
            <a
              href="#/active"
              onClick={selectActive}
              className={classnames({ selected: isActive === 'active' })}
            >
              Active
            </a>
          </li>

          <li>
            <a
              href="#/completed"
              onClick={selectComplited}
              className={classnames({ selected: isActive === 'completed' })}
            >
              Completed
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="clear-completed"
          onClick={() => {
            clearAllCompleted();
          }}
        >
          Clear completed
        </button>
      </footer>
    );
  },
);

Footer.propTypes = PropTypes.shape({
  filterData: PropTypes.func.isRequired,
  gettodosActiveTodosLength: PropTypes.func.isRequired,
  clearAllCompleted: PropTypes.func.isRequired,
}).isRequired;
