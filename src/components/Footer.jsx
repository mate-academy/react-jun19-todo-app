import React from 'react';
import PropTypes from 'prop-types';

const Footer = (props) => {
  const {
    todos,
    handleDestroyCompleted,
    handleSetDesc,
  } = props;

  return (
    <footer className="footer">
      <span className="todo-count">
        {`${todos.filter(todo => !todo.completed).length}`}
        {' items left'}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className="selected"
            onClick={() => handleSetDesc('all')}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className="selected"
            onClick={() => handleSetDesc('active')}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className="selected"
            onClick={() => handleSetDesc('completed')}
          >
            Completed
          </a>
        </li>
      </ul>

      {todos.some(todo => todo.completed) && (
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
    id: PropTypes.number,
  })).isRequired,
  handleDestroyCompleted: PropTypes.func,
  handleSetDesc: PropTypes.func,
};

Footer.defaultProps = {
  handleDestroyCompleted: () => {},
  handleSetDesc: () => {},
};

export default Footer;
