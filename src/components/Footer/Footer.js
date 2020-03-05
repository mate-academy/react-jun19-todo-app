import React from 'react';
import PropTypes from 'prop-types';

export class Footer extends React.Component {
  state = {
    selectedButton: {
      all: true,
      active: false,
      completed: false,
    },
  }

  handleClick = ({ target: { name } }) => {
    this.props.setfilterField(name);
    this.setState(prevState => ({
      selectedButton: Object.keys(prevState.selectedButton)
        .reduce((acc, key) => ({
          ...acc,
          [key]: key === name,
        }), {}),
    }));
  }

  render() {
    const { todos, clearCompleted } = this.props;
    const { selectedButton } = this.state;
    const uncompletedTasksCount = todos
      .filter(todo => !todo.completed).length;

    return (
      <footer className="footer">

        <span className="todo-count">
          {uncompletedTasksCount}
          {' '}
            items left
        </span>

        <ul className="filters">
          <li>
            <a
              href="#/"
              name="all"
              onClick={this.handleClick}
              className={selectedButton.all ? 'selected' : ''}
            >
              All
            </a>
          </li>

          <li>
            <a
              name="active"
              href="#/active"
              onClick={this.handleClick}
              className={selectedButton.active ? 'selected' : ''}
            >
              Active
            </a>
          </li>

          <li>
            <a
              name="completed"
              href="#/completed"
              onClick={this.handleClick}
              className={selectedButton.completed ? 'selected' : ''}
            >
              Completed
            </a>
          </li>
        </ul>

        <button
          type="button"
          onClick={clearCompleted}
          className="clear-completed"
        >
          Clear completed
        </button>
      </footer>
    );
  }
}

Footer.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
  setfilterField: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};
