import React from 'react';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { ToggleAll } from './components/ToggleAll/ToggleAll';

class App extends React.Component {
  state = {
    todos: JSON.parse(localStorage.getItem('storage')) || [],
    activeTab: 'all',
  }

  componentDidUpdate() {
    const { todos } = this.state;

    localStorage.setItem('storage', JSON.stringify(todos));
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        todo,
      ],
    }));
  };

  deleteTodo = (currentId) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== currentId),
    }));
  }

  checkedTodo = (currentId) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === currentId) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  }

  toggleAll = (event) => {
    const { checked } = event.target;

    this.setState(prevState => ({
      todos: prevState.todos.map(todo => ({
        ...todo,
        completed: checked,
      })),
    }));
  }

  clearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  }

  setActiveTab = (name) => {
    this.setState({
      activeTab: name,
    });
  }

  render() {
    const { todos, activeTab } = this.state;

    const allSelected = todos.every(todo => todo.completed);

    let visibleTodos = [];

    switch (activeTab) {
      case 'active':
        visibleTodos = todos.filter(todo => !todo.completed);
        break;
      case 'completed':
        visibleTodos = todos.filter(todo => todo.completed);
        break;
      default:
        visibleTodos = todos;
    }

    return (
      <section className="todoapp">
        <Header addTodo={this.addTodo} />
        <section className="main">
          {todos.length > 0 && (
            <ToggleAll
              toggleAll={this.toggleAll}
              allSelected={allSelected}
            />
          )}
          <TodoList
            todos={visibleTodos}
            checkedTodo={this.checkedTodo}
            deleteTodo={this.deleteTodo}
          />
        </section>
        {todos.length > 0 && (
          <Footer
            todos={todos}
            clearCompleted={this.clearCompleted}
            setActiveTab={this.setActiveTab}
            activeTab={activeTab}
          />
        )}
      </section>
    );
  }
}

export default App;
