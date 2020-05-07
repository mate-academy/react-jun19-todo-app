import React from 'react';
import classNames from 'classnames';
import TodoList from './TodoList';
import NewTodo from './NewTodo';

class TodoApp extends React.Component {
  state = {
    todos: [],
    filter: 'all',
    onSelectAllTodos: true,
  }

  addTodo = (newTodo) => {
    this.setState(prevState => ({ todos: [...prevState.todos, newTodo] }));
  }

  changeStatus = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  }

  deleteTodo = (event) => {
    const removeTodoId = this.state.todos
      .findIndex(item => item.id === +event.target.id);

    this.setState((prevState) => {
      const remainingTodos = [...prevState.todos];

      remainingTodos.splice(removeTodoId, 1);

      return (
        { todos: [...remainingTodos] }
      );
    });
  }

  selectAllTodo = () => {
    this.setState(prevState => ({
      onSelectAllTodos: !prevState.onSelectAllTodos,
      todos: prevState.todos.map(todo => ({
        ...todo,
        completed: prevState.onSelectAllTodos,
      })),
    }));
  }

  clearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.completed === false),
    }));
  }

  filterViewAll = () => {
    this.setState({
      filter: 'all',
    });
  }

  filterActive = () => {
    this.setState({
      filter: 'active',
    });
  }

  filterCompleted = () => {
    this.setState({
      filter: 'completed',
    });
  }

  render() {
    const {
      todos,
      filter,
    } = this.state;

    const notComplitedTodo = todos.filter(todo => todo.completed === false);
    let preparedTodos;

    if (filter === 'all') {
      preparedTodos = [...todos];
    }

    if (filter === 'active') {
      preparedTodos = [...todos].filter(todo => todo.completed === false);
    }

    if (filter === 'completed') {
      preparedTodos = [...todos].filter(todo => todo.completed === true);
    }

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
        </header>
        <NewTodo
          addTodo={this.addTodo}
          length={todos.length}
        />
        <TodoList
          todos={preparedTodos}
          changeStatus={this.changeStatus}
          deleteTodo={this.deleteTodo}
          selectAllTodo={this.selectAllTodo}
        />

        <footer
          className={classNames('footer', { activeClear: todos.length === 0 })}
        >
          <span className="todo-count">
            {notComplitedTodo.length}
            {' '}
            items left
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={classNames({ selected: filter === 'all' })}
                onClick={this.filterViewAll}
              >
                All
              </a>
            </li>
            <li>
              <a
                href="#/active"
                onClick={this.filterActive}
                className={classNames({ selected: filter === 'active' })}
              >
                Active
              </a>
            </li>
            <li>
              <a
                href="#/completed"
                onClick={this.filterCompleted}
                className={classNames({ selected: filter === 'completed' })}
              >
                Completed
              </a>
            </li>
          </ul>

          <button
            type="button"
            className={classNames('clear-completed',
              { activeClear: todos.length === notComplitedTodo.length })}
            onClick={this.clearCompleted}
          >
            Clear completed
          </button>
        </footer>
      </section>

    );
  }
}

export default TodoApp;
