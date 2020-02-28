import React, { Component } from 'react';
import cn from 'classnames';
import { InputTodo } from './components/InputTodo';
import { TodoList } from './components/TodoList';
import { NotFinishedTodo } from './components/NotFinishedTodo';

const filterTodos = (todos, filter) => {
  switch (filter) {
    case 'active':
      return todos.filter(todo => todo.completed === false);
    case 'completed':
      return todos.filter(todo => todo.completed === true);
    default:
      return todos;
  }
};

export class App extends Component {
  state = {
    todos: [],
    filter: 'all',
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  }

  deleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  }

  toggleComplited = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (
        todo.id === id
          ? {
            ...todo,
            completed: !todo.completed,
          }
          : todo
      )),
    }));
  }

  handleCheckedAll = (event) => {
    if (event.target.checked) {
      this.setState(prevState => ({
        todos: prevState.todos.map(todo => ({
          ...todo,
          completed: true,
        })),
      }));
    } else {
      this.setState(prevState => ({
        todos: prevState.todos.map(todo => ({
          ...todo,
          completed: false,
        })),
      }));
    }
  }

  clearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  }

  changeFilter = (event) => {
    this.setState({
      filter: event.target.getAttribute('data-filter'),
    });
  }

  render() {
    const { todos, filter } = this.state;
    const notFinishedTodo = todos.filter(todo => !todo.completed);
    const preparedTodos = filterTodos(todos, filter);

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <InputTodo addTodo={this.addTodo} />
        </header>
        <section className="main">
          <TodoList
            todos={preparedTodos}
            deleteTodo={this.deleteTodo}
            toggleComplited={this.toggleComplited}
            handleCheckedAll={this.handleCheckedAll}
          />
        </section>

        <footer className="footer">
          <NotFinishedTodo notFinishedTodo={notFinishedTodo} />
          <ul className="filters">
            <li>
              <button
                type="button"
                href="#/"
                data-filter="all"
                className={cn({ selected: filter === 'all' })}
                onClick={this.changeFilter}
              >
              All
              </button>
            </li>

            <li>
              <button
                type="button"
                href="#/active"
                data-filter="active"
                className={cn({ selected: filter === 'active' })}
                onClick={this.changeFilter}
              >
              Active
              </button>
            </li>

            <li>
              <button
                type="button"
                href="#/completed"
                data-filter="completed"
                className={cn({ selected: filter === 'completed' })}
                onClick={this.changeFilter}
              >
              Completed
              </button>
            </li>
          </ul>

          <button
            type="button"
            className="clear-completed"
            onClick={this.clearCompleted}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}
