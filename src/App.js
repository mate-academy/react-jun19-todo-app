import React from 'react';
import { TodoApp } from './components/TodoApp/TodoApp';
import todosFromServer from './api/todos';

const isTodoChanged = (todo, id) => {
  if (todo.id === id) {
    return {
      ...todo,
      completed: !todo.completed,
    };
  }

  return todo;
};

class App extends React.Component {
  state = {
    todos: [],
    filter: 'all',
    activeTodos: 0,
  }

  componentDidMount() {
    this.getTodosFromApi();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.todos !== prevState.todos) {
      this.onUpdate();
    }
  }

  onUpdate = () => {
    this.setState(prevState => ({
      ...prevState,
      activeTodos: prevState.todos
        .reduce((counter, todo) => (
          counter + (todo.completed ? 0 : 1)
        ), 0),
    }));
  };

  getTodosFromApi = () => {
    this.setState({
      todos: todosFromServer,
    });
  };

  onTodoStatus = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos
        .map(todo => isTodoChanged(todo, id)),
    }));
  };

  onTodoStatusAll = (event) => {
    const { target: { checked } } = event;

    this.setState(prevState => ({
      todos: prevState.todos
        .map(todo => (
          {
            ...todo,
            completed: checked,
          }
        )),
    }));
  };

  onRemove = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos
        .filter(todo => (todo.id !== id)),
    }));
  }

  onFilter = (criteria) => {
    this.setState(prevState => ({
      ...prevState,
      filter: criteria,
    }));
  }

  render() {
    const {
      todos,
      activeTodos,
      filter,
    } = this.state;

    return (
      <TodoApp
        todos={todos}
        activeTodos={activeTodos}
        filter={filter}
        onStatus={this.onTodoStatus}
        onRemove={this.onRemove}
        onStatusAll={this.onTodoStatusAll}
        onFilter={this.onFilter}
      />
    );
  }
}

export default App;
