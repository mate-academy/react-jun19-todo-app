import React from 'react';
import PropTypes from 'prop-types';
import TodoList from './TodoList';

class TodoApp extends React.Component {
  state = {
    id: 0,
    title: '',
    completed: false,
  };

  getTitle = (event) => {
    const { value } = event.target;

    event.preventDefault();
    this.setState({
      title: value,
    });
  }

  createTodo = (event) => {
    event.preventDefault();

    this.props.addTodo({
      ...this.state,
      id: Date.now(),
    });

    this.setState({
      title: '',
    });
  };

  render() {
    const {
      todos,
      changeTodoCompleted,
      changeTodoCompletedAll,
      destroyTodo,
      filterTodos,
      filterDescription,
    } = this.props;
    const { title } = this.state;

    return (
      <form onSubmit={this.createTodo}>
        <header className="header">
          <h1>todos</h1>

          <input
            onChange={this.getTitle}
            value={title}
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </header>
        <section className="main" style={{ display: 'block' }}>
          <input
            onClick={changeTodoCompletedAll}
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
          />
          {/* eslint-disable-next-line */}
          <label htmlFor="toggle-all">Mark all as complete</label>
        </section>
        <TodoList
          todos={(filterDescription === 'active'
          || filterDescription === 'completed')
            ? filterTodos : todos}
          changeTodoCompleted={changeTodoCompleted}
          destroyTodo={destroyTodo}
        />
      </form>
    );
  }
}

TodoApp.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  destroyTodo: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
  changeTodoCompleted: PropTypes.func.isRequired,
  changeTodoCompletedAll: PropTypes.func.isRequired,
  filterTodos: PropTypes.arrayOf(PropTypes.array).isRequired,
  filterDescription: PropTypes.string.isRequired,
};

export default TodoApp;
