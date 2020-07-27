import React from 'react';
import TodoList from './TodoList';
import Header from './Header';
import Footer from './Footer';

const filters = {
  active: 'Active',
  completed: 'Completed',
  all: 'All',
};

class App extends React.Component {
  state = {
    todos: [],
    typeOfFilter: filters.all,
  }

  addNewTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  }

  markAll = () => {
    if (this.state.todos.every(todo => todo.completed === true)) {
      this.setState(state => ({
        todos: state.todos.map(todo => (
          {
            ...todo,
            completed: false,
          }
        )),
      }));
    } else {
      this.setState(state => ({
        todos: state.todos.map(todo => (
          {
            ...todo,
            completed: true,
          }
        )),
      }));
    }
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

  deleteTodo = (id) => {
    this.setState(({ todos }) => ({
      todos: todos.filter(todo => todo.id !== id),
    }));
  }

  listOfVisibleTodos = () => {
    const { todos, typeOfFilter } = this.state;

    if (typeOfFilter === filters.completed) {
      return todos.filter(todo => todo.completed);
    }

    if (typeOfFilter === filters.active) {
      return todos.filter(todo => !todo.completed);
    }

    return todos;
  }

  changeFilter = (filter) => {
    this.setState({
      typeOfFilter: filter,
    });
  }

  clearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  }

  render() {
    const { todos, typeOfFilter, changeFilter } = this.state;
    const countOfNotFinishedTodos = todos
      .filter(todo => todo.completed === false).length;
    const visibleTodos = this.listOfVisibleTodos(changeFilter);

    return (
      <section className="todoapp">
        <Header addNewTodo={this.addNewTodo} />
        <TodoList
          todos={visibleTodos}
          changeStatus={this.changeStatus}
          deleteTodo={this.deleteTodo}
          markAll={this.markAll}
        />
        {todos.length > 0
          && (
            <Footer
              typeOfFilter={typeOfFilter}
              changeFilter={this.changeFilter}
              countOfNotFinishedTodos={countOfNotFinishedTodos}
              clearCompleted={this.clearCompleted}
            />
          )}
      </section>
    );
  }
}

export default App;
