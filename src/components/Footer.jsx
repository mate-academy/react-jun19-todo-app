import React from 'react';
import PropTypes from 'prop-types';

const Footer = (props) => {
  const {
    todos,
    isCompleted,
    handleDestroyCompleted,
    handleFilter,
  } = props;

  return (
    <footer className="footer" style={{ display: 'block' }}>
      <span className="todo-count">
        {`${todos.filter(todo => (!todo.completed)).length}`}
        {' items left'}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className="selected"
            onClick={() => handleFilter('all')}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className="selected"
            onClick={() => handleFilter('active')}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className="selected"
            onClick={() => handleFilter('completed')}
          >
            Completed
          </a>
        </li>
      </ul>

      {isCompleted && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleDestroyCompleted}
          style={{ display: 'block' }}
        >
          Clear completed
        </button>
      )}

    </footer>
  );
};

Footer.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    id: PropTypes.instanceOf(Date),
  })).isRequired,
  isCompleted: PropTypes.bool,
  handleDestroyCompleted: PropTypes.func,
  handleFilter: PropTypes.func,
};

Footer.defaultProps = {
  isCompleted: false,
  handleDestroyCompleted: () => {},
  handleFilter: () => {},
};

export default Footer;
