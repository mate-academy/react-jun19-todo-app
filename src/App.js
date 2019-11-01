import React from 'react';
import Header from './Components/Header';
import ToDoList from './Components/ToDoList';
import Footer from './Components/Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todolist: [],
      currentValue: '',
      lastId: 0,
      filter: 'all',
    };
  }

  changeInput = (event) => {
    const { value } = event.target;

    this.setState(PrevState => ({
      ...PrevState,
      currentValue: value,
    }));
  };

  addItem = (event) => {
    const curVal = this.state.currentValue;

    const newItem = {
      text: curVal,
      done: false,
      id: this.state.lastId + 1,
    };

    if (event.keyCode !== 13) {
      return;
    }

    if (!this.state.currentValue.match(/\w/g)) {
      this.setState(prevState => ({
        ...prevState,
        currentValue: '',
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        todolist: [...prevState.todolist, newItem],
        currentValue: '',
        lastId: newItem.id,
      }));
    }
  };

  deleteItem = (index) => {
    const list = [...this.state.todolist];

    list.splice(index, 1);
    this.setState(PrevState => ({
      ...PrevState,
      todolist: list,
    }));
  };

  clearDone = () => {
    const list = [...this.state.todolist].filter(item => item.done === false);

    this.setState(PrevState => ({
      todolist: list,
    }));
  };

  toggleItem = (index) => {
    const list = [...this.state.todolist];

    list[index].done = !list[index].done;
    this.setState(PrevState => ({
      ...PrevState,
      todoList: list,
    }));
  };

  toggleAll = () => {
    const oldList = [...this.state.todolist];

    this.setState(({ todolist }) => {
      const completed = oldList.every(item => item.done === true);
      const toggledList = oldList.map(item => ({ ...item, done: true }));

      if (completed) {
        const untoggledList = oldList.map(item => ({ ...item, done: false }));

        return {
          todolist: untoggledList,
        };
      }

      return {
        todolist: toggledList,
      };
    });
  };

  changeFilter = (filChange) => {
    this.setState(({ filter }) => ({
      filter: filChange,
    }));
  };

  render() {
    const list = [...this.state.todolist];
    let filteredList;

    switch (this.state.filter) {
      case 'All':
        filteredList = list;
        break;
      case 'Active':
        filteredList = list.filter(item => item.done === false);
        break;
      case 'Completed':
        filteredList = list.filter(item => item.done === true);
        break;
      default:
        filteredList = list;
    }

    return (
      <section className="todoapp">
        <h1>todos</h1>
        <Header
          changeInput={this.changeInput}
          addItem={this.addItem}
          value={this.state.currentValue}
        />
        <ToDoList
          todolist={filteredList}
          deleteItem={this.deleteItem}
          toggleItem={this.toggleItem}
          toggleAll={this.toggleAll}
        />

        <Footer
          todolist={this.state.todolist}
          clearDone={this.clearDone}
          filter={this.state.filter}
          changeFilter={this.changeFilter}
        />
      </section>
    );
  }
}

export default App;
