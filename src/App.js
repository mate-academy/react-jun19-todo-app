import React from 'react';
import TodoList from './components/todoList/TodoList';
import Footer from './components/footer/Footer';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoList: [],
      id: 1,
      title: '',
      selectedPage: 'All',
    };
  }

  onInputChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  addTodo = (event) => {
    event.preventDefault();

    const newItem = {
      id: this.state.id,
      title: this.state.title,
      completed: false,
    };

    if (this.state.title.trim() !== '') {
      this.setState(prevState => ({
        ...prevState,
        todoList: [...prevState.todoList, newItem],
        id: prevState.id + 1,
        title: '',
    }))};
  }

  clearInputField = (event) => {
    if (event.key === "Enter") {
      event.target.value = '';
    }
  }

  removeTodo = (todoId) => {
    this.setState(prevState => ({
      ...prevState,
      todoList: [...prevState.todoList].filter(todo => (
        todo.id !== todoId
      )),
    }));
  }

  changeCompleted = (event) => {
    const todoId = +event.target.id;

    this.setState(prevState => ({
      ...prevState,
      todoList: prevState.todoList.map(todo => {
        if (todoId === todo.id) {
          return {
            ...todo, completed: !todo.completed
          };
        }

        return todo;
      })
    }));
  }

  todosFilter = (event) => {
    const page = event.target.innerText;

    this.setState({
      selectedPage: page,
    });
  }

  markAllAsComplete = () => {
    this.setState(prevState => ({
      ...prevState,
      todoList: prevState.todoList.map(todo => {
        if (prevState.todoList.every(item => item.completed)) {
          return {...todo, completed: false}
        }

        return {...todo, completed: true}
      })
    }));
  }

  clearCompleted = () => {
    this.setState(prevState => ({
      ...prevState,
      todoList: prevState.todoList.filter(todo => !todo.completed)
    }));
  }

  render() {
    const { todoList, selectedPage } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <form onSubmit={this.addTodo}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              onChange={this.onInputChange}
              onKeyDown={this.clearInputField}
            />
          </form>
        </header>

        <TodoList
          todoList={todoList}
          removeTodo={this.removeTodo}
          changeCompleted={this.changeCompleted}
          selectedPage={selectedPage}
          markAllAsComplete={this.markAllAsComplete}
        />

        <Footer
          todoList={todoList}
          selectedPage={selectedPage}
          todosFilter={this.todosFilter}
          clearCompleted={this.clearCompleted}
        />
      </section>
    );
  }
}

export default App;
