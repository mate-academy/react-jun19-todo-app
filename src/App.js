import React from 'react';
import ListToDo from './ListToDo';

class App extends React.Component {
  state = {
    todos: [],
    nextId: 1,
    typeOfFilter: 'all',
    isAllButtonActive: true,
    isActiveButtonActive: false,
    isComplitedButtonActive: false,
    isToggleAll: true,
    fieldValue: '',
    isAnyEditedField: false,
  }

  componentDidMount() {
    if (!localStorage.getItem('ToDoAppData')) {
      return;
    }

    const initState = JSON.parse(localStorage.getItem('ToDoAppData'));
    const {
      todos,
      nextId,
      typeOfFilter,
      isAllButtonActive,
      isActiveButtonActive,
      isComplitedButtonActiv,
      isToggleAll,
      fieldValue,
    } = initState;

    this.setState({
      todos,
      nextId,
      typeOfFilter,
      isAllButtonActive,
      isActiveButtonActive,
      isComplitedButtonActiv,
      isToggleAll,
      fieldValue,
    });
  }

  componentDidUpdate() {
    localStorage.setItem('ToDoAppData', JSON.stringify(this.state));
  }

  handleIsActiveChange = (event) => {
    // const { todos } = this.state;
    //   this.setState(prevState => ({
    //     isToggleAll: !prevState.isToggleAll,
    //   }));
    // }
    const { id } = event.target.parentElement.parentElement;
    const indexOfElement = this.state.todos.findIndex(item => (
      item.id === parseInt(id, 10)));

    this.setState((prevState) => {
      const tempTodos = [...prevState.todos];

      tempTodos[indexOfElement].isActive = !tempTodos[indexOfElement].isActive;
      const trigger = (
        tempTodos.length === tempTodos.filter(item => item.isActive).length
      );

      return (
        {
          todos: [...tempTodos],
          isToggleAll: trigger,
        }

      );
    });
  }

  addNewToDo = (event) => {
    if (this.state.fieldValue.trim() !== '') {
      this.setState(prevState => ({
        todos: [
          ...prevState.todos,
          {
            description: prevState.fieldValue,
            isActive: true,
            id: prevState.nextId,
            isEdited: false,
          },
        ],
        nextId: prevState.nextId + 1,
        fieldValue: '',
      }));
    }
  }

  changeAddField = (event) => {
    const { value } = event.target;

    this.setState({ fieldValue: value });
  }

  deleteToDo = (event) => {
    const { id } = event.target.parentElement.parentElement;
    const indexOfDeletedElement = this
      .state
      .todos
      .findIndex(item => (item.id === parseInt(id, 10)));

    this.setState((prevState) => {
      const tempTodos = [...prevState.todos];

      tempTodos.splice(indexOfDeletedElement, 1);

      return (
        {
          todos: [...tempTodos],
        }
      );
    });
  }

  clearComplited = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(item => item.isActive),
    }));
  }

  setFilterToAll = (event) => {
    this.setState({
      typeOfFilter: 'all',
      isAllButtonActive: true,
      isActiveButtonActive: false,
      isComplitedButtonActive: false,
    });
  }

  setFilterToActive = (event) => {
    this.setState({
      typeOfFilter: 'active',
      isAllButtonActive: false,
      isActiveButtonActive: true,
      isComplitedButtonActive: false,
    });
  }

  setFilterToCompleted = (event) => {
    this.setState({
      typeOfFilter: 'completed',
      isAllButtonActive: false,
      isActiveButtonActive: false,
      isComplitedButtonActive: true,
    });
  }

  handleToggleAllChange = () => {
    const tempIsToggleAll = this.state.isToggleAll;

    this.setState(prevState => ({
      todos: prevState.todos.map((item) => {
        const tempItem = { ...item };

        tempItem.isActive = !tempIsToggleAll;

        return tempItem;
      }),
      isToggleAll: !tempIsToggleAll,
    }));
  }

  handleItemDoubleClick = (event) => {
    if (this.state.isAnyEditedField) {
      return;
    }

    const { id } = event.target.parentElement.parentElement;
    const indexOfElement = this
      .state
      .todos
      .findIndex(item => (item.id === parseInt(id, 10)));

    this.setState((prevState) => {
      const tempTodos = [...prevState.todos];

      tempTodos[indexOfElement].isEdited = !tempTodos[indexOfElement].isEdited;

      return (
        {
          todos: [...tempTodos],
          isAnyEditedField: true,
        }
      );
    });
  }

  handleEditEnter = (event) => {
    if (event.key !== 'Enter' && event.type !== 'blur') {
      return;
    }

    if (event.target.value.trim() === '') {
      return;
    }

    const { id } = event.target.parentElement;
    const indexOfElement = this
      .state
      .todos
      .findIndex(item => (item.id === parseInt(id, 10)));

    this.setState((prevState) => {
      const tempTodos = [...prevState.todos];

      tempTodos[indexOfElement].isEdited = false;

      return (
        {
          todos: [...tempTodos],
          isAnyEditedField: false,
        }
      );
    });
  }

  handleEditFieldChange = (event) => {
    const { id } = event.target.parentElement;
    const indexOfElement = this
      .state
      .todos
      .findIndex(item => (item.id === parseInt(id, 10)));
    const { value } = event.target;

    this.setState((prevState) => {
      const tempTodos = [...prevState.todos];

      tempTodos[indexOfElement].description = value;

      return (
        {
          todos: [...tempTodos],

        }
      );
    });
  }

  render() {
    let filteredTodos = [...this.state.todos];

    if (this.state.typeOfFilter === 'active') {
      filteredTodos = this.state.todos.filter(item => item.isActive);
    }

    if (this.state.typeOfFilter === 'completed') {
      filteredTodos = this.state.todos.filter(item => !item.isActive);
    }

    const activeItemCount = this
      .state
      .todos
      .filter(item => item.isActive).length;

    const {
      isActiveButtonActive,
      fieldValue,
      isAllButtonActive,
      isComplitedButtonActive,
      isToggleAll,
    } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={this.addNewToDo}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              onChange={this.changeAddField}
              value={fieldValue}
            />
          </form>
        </header>

        <section className="main">
          <input
            onChange={this.handleToggleAllChange}
            checked={isToggleAll}
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ListToDo
            todos={filteredTodos}
            changeToDo={this.handleChangeToDo}
            deleteToDo={this.deleteToDo}
            handleIsActiveChange={this.handleIsActiveChange}
            handleItemDoubleClick={this.handleItemDoubleClick}
            handleEditEnter={this.handleEditEnter}
            handleEditFieldChange={this.handleEditFieldChange}
          />
        </section>

        <footer className="footer">
          <span className="todo-count">
            {activeItemCount}
            {' '}
            items left
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={isAllButtonActive ? 'selected' : ''}
                onClick={this.setFilterToAll}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={isActiveButtonActive ? 'selected' : ''}
                onClick={this.setFilterToActive}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={isComplitedButtonActive ? 'selected' : ''}
                onClick={this.setFilterToCompleted}
              >
                Completed
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="clear-completed"
            onClick={this.clearComplited}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
