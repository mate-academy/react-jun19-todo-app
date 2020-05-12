import React from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { Filter } from './components/Filter/Filter';
import { FILTERS } from './constants/filters';

export default class App extends React.Component {
  state = {
    todos: [],
    title: '',
    currentId: 1,
    activeItems: FILTERS.all,
  };

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  toggleTodoStatus = (todoId) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      }),
    }));
  }

  toggleAllTodosStatus = ({ target }) => {
    this.setState(({ todos }) => ({
      todos: todos.map(todo => ({
        ...todo,
        completed: target.checked,
      })),
    }));
  }

  addTodo = (event) => {
    event.preventDefault();

    const { title, currentId } = this.state;

    if (!title.trim()) {
      this.setState({ title: '' });

      return;
    }

    const newTodo = {
      id: currentId,
      title,
      completed: false,
    };

    this.setState(state => ({
      todos: [...state.todos, newTodo],
      title: '',
      currentId: state.currentId + 1,
    }));
  }

  removeTodo = (todoId) => {
    this.setState(({ todos }) => ({
      todos: todos.filter(todo => todo.id !== todoId),
    }));
  }

  setActiveTodos = (item) => {
    this.setState({ activeItems: item });
  }

  clearCompletedTodos = () => {
    this.setState(({ todos }) => ({
      todos: todos.filter(todo => !todo.completed),
    }));
  }

  listFilter = (items) => {
    const { todos } = this.state;

    switch (items) {
      case FILTERS.active:
        return todos.filter(todo => !todo.completed);

      case FILTERS.completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }

  render() {
    const { todos, title, activeItems } = this.state;
    const visibleList = this.listFilter(activeItems);
    const numOfActiveTodos = todos.filter(todo => !todo.completed).length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <form onSubmit={this.addTodo}>
            <input
              type="text"
              className="new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={this.handleTitleChange}
            />
          </form>
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={todos.every(todo => todo.completed)}
            onChange={this.toggleAllTodosStatus}
          />
          {todos.length > 0 && (
            <label
              htmlFor="toggle-all"
            >
              Mark all as complete
            </label>
          )}

          <TodoList
            items={visibleList}
            onStatusToggle={this.toggleTodoStatus}
            removeTodo={this.removeTodo}
          />
        </section>

        {todos.length > 0 && (
          <footer className="footer">

            <span className="todo-count">
              {numOfActiveTodos}
              {' '}
              item
              {numOfActiveTodos !== 1 && 's'}
              {' '}
              left
            </span>

            <ul className="filters">
              {Object.values(FILTERS).map(filter => (
                <Filter
                  key={filter}
                  filterName={filter}
                  currentActiveItems={activeItems}
                  setActiveItems={this.setActiveTodos}
                />
              ))}
            </ul>

            {todos.some(todo => todo.completed) && (
              <button
                type="button"
                className="clear-completed"
                onClick={this.clearCompletedTodos}
              >
                Clear completed
              </button>
            )}
          </footer>
        )}

      </section>
    );
  }
}
