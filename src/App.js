import React from 'react';
import uuid from 'react-uuid';
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
      localStorage.setItem('todoItems', JSON.stringify(this.state.todos));
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
    if (localStorage.getItem('todoItems')) {
      this.setState({
        todos: JSON.parse(localStorage.getItem('todoItems')),
      });
    } else {
      this.setState({
        todos: todosFromServer,
      });
    }
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
  };

  onFilter = (criteria) => {
    this.setState(prevState => ({
      ...prevState,
      filter: criteria,
    }));
  };

  onRemoveCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos
        .filter(todo => (!todo.completed)),
    }));
  };

  handleSaveEdit = (value, id) => {
    const isValueValid = value.trim().search(/\S/) !== -1;

    if (isValueValid) {
      this.setState(prevState => ({
        ...prevState,
        todos: prevState.todos
          .map(todo => (
            todo.id === id
              ? ({
                ...todo,
                title: value,
              })
              : (
                todo
              )
          )),
      }));
    } else {
      this.onRemove(id);
    }
  };

  addNewTodo = (todoName) => {
    const isNameValid = todoName.trim().search(/\S/) !== -1;

    if (isNameValid) {
      this.setState(prevState => ({
        todos: [
          {
            userId: 1,
            id: uuid(),
            title: todoName,
            completed: false,
          },
          ...prevState.todos,
        ],
      }));
    }
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
        onSaveEdit={this.handleSaveEdit}
        onStatusAll={this.onTodoStatusAll}
        onFilter={this.onFilter}
        onRemoveCompleted={this.onRemoveCompleted}
        onSaveInput={this.addNewTodo}
      />
    );
  }
}

export default App;
