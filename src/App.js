import React from 'react';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';

class App extends React.Component {
  state = {
    todos: [],
    todoNumber: 1,
    todosFilter: () => true,
  };

  componentDidMount() {
    const storageState = JSON.parse(localStorage.getItem('state'));

    if (!Object.is(null, storageState)) {
      this.setState({
        todos: storageState.todos,
        todoNumber: storageState.todoNumber,
      });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.todos !== prevState.todos) {
      localStorage.setItem('state', JSON.stringify(this.state));
    }
  }

  createTodo = (value) => {
    this.setState(state => ({
      todos:
        [
          ...state.todos,
          {
            title: value.trim(),
            id: state.todoNumber,
            completed: false,
          },
        ],
      todoNumber: state.todoNumber + 1,
    }));
  }

  toggleAllCompleted = (isAllCompleted) => {
    if (isAllCompleted) {
      this.setState(state => ({
        todos: state.todos.map(todo => ({
          ...todo,
          completed: false,
        })),
      }));
    } else {
      this.setState(state => ({
        todos: state.todos.map(todo => ({
          ...todo,
          completed: true,
        })),
      }));
    }
  }

  toggleCompleted = (id) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return ({
            ...todo,
            completed: !todo.completed,
          });
        }

        return todo;
      }),
    }));
  }

  editTodo = (title, id) => {
    if (title !== '') {
      this.setState(state => ({
        todos: state.todos.map((todo) => {
          if (todo.id === id) {
            return ({
              ...todo,
              title,
            });
          }

          return todo;
        }),
      }));
    } else {
      this.destroyTodo(id);
    }
  }

  destroyTodo = (id) => {
    this.setState(state => ({
      todos: state.todos.filter(todo => todo.id !== id),
    }));
  }

  changeFilter = (callback) => {
    this.setState({
      todosFilter: callback,
    });
  }

  clearCompleted = () => {
    this.setState(state => ({
      todos: state.todos.filter(todo => !todo.completed),
    }));
  }

  render() {
    const {
      todos,
      todosFilter,
    } = this.state;

    return (
      <section className="todoapp">
        <Header createTodo={this.createTodo} />

        <Main
          todos={todos}
          todosFilter={todosFilter}
          toggleAllCompleted={this.toggleAllCompleted}
          toggleCompleted={this.toggleCompleted}
          editTodo={this.editTodo}
          destroyTodo={this.destroyTodo}
        />

        {
          this.state.todos.length > 0
            && (
              <Footer
                uncompletedLength={todos.filter(todo => (
                  !todo.completed
                )).length}
                changeFilter={this.changeFilter}
                clearCompleted={this.clearCompleted}
              />
            )
        }
      </section>
    );
  }
}

export default App;
