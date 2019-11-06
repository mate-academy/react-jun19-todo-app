import React from 'react';
import Input from './components/Input';
import TodoList from './components/TodoList';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      lastId: 0,
      activeTab: '',
    };
  }

  componentDidMount() {
    const { lastList, lastLastId } = this.getFromLocalStorage();

    this.setState({
      list: lastList,
      lastId: lastLastId,
    });
  }

  addTodo = (item) => {
    if (item.trim() === '') {
      return;
    }

    this.setState(prevState => ({
      list: [...prevState.list, {
        title: item,
        done: false,
        id: prevState.lastId + 1,
        editModeItemIndexItemIndex: null,
      }],
      lastId: prevState.lastId + 1,
    }),
    this.putInLocalStorage);
  };

  toDelete = (id) => {
    this.setState(({ list }) => {
      const slicedTodos = list.filter(item => item.id !== id);

      return { list: slicedTodos };
    },
    this.putInLocalStorage);
  };

  toggledAll = () => {
    this.setState(({ list }) => {
      if (list.every(item => item.done === false)) {
        const newList = list.map(item => ({
          ...item,
          done: true,
        }));

        return {
          list: newList,
        };
      }

      const newList = list.map(item => ({
        ...item,
        done: false,
      }));

      return {
        list: newList,
      };
    },
    this.putInLocalStorage);
  };

  toggled = (targetId) => {
    this.setState(prevState => ({
      list: [...prevState.list.map((item) => {
        if (targetId === item.id) {
          return { ...item, done: !item.done };
        }

        return item;
      })],
    }),
    this.putInLocalStorage);
  };

  clearDone = () => {
    this.setState(prevState => ({
      ...prevState,
      list: [...prevState.list].filter(item => !item.done),
    }),
    this.putInLocalStorage);
  };

  activeFilter = (filter) => {
    switch (filter) {
      case 'All':
        this.setState(prevState => ({
          ...prevState,
          activeTab: 'All',
        }),
        this.putInLocalStorage);
        break;
      case 'Active':
        this.setState(prevState => ({
          ...prevState,
          activeTab: 'Active',
        }),
        this.putInLocalStorage);
        break;
      case 'Completed':
        this.setState(prevState => ({
          ...prevState,
          activeTab: 'Completed',
        }),
        this.putInLocalStorage);
        break;
      default:
        this.setState(prevState => ({
          ...prevState,
          activeTab: 'All',
        }),
        this.putInLocalStorage);
        break;
    }
  };

  putInLocalStorage = () => {
    localStorage.setItem('list', JSON.stringify(this.state.list));
    localStorage.setItem('lastId', JSON.stringify(this.state.lastId));
  };

  getFromLocalStorage = () => {
    const list = JSON.parse(localStorage.getItem('list'));
    const lastId = JSON.parse(localStorage.getItem('lastId'));

    return ({
      lastList: list || [],
      lastLastId: lastId || 0,
    });
  };

  editText = (index) => {
    this.setState(prevState => ({
      list: [...prevState.list.map(item => ({
        ...item,
        editModeItemIndex: index,
      }))],
    }),
    this.putInLocalStorage);
  };

  editEnter = (event) => {
    const { key, target } = event;
    const text = target.value;
    const id = +(target.id.match(/[0-9]/g).join(''));

    if (key === 'Enter' && text.trim() !== '') {
      this.setState(prevState => ({
        list: [...prevState.list.map((item) => {
          if (id === item.id) {
            return {
              ...item,
              editModeItemIndex: false,
              title: text,
              id: prevState.lastId + 1,
              done: false,
            };
          }

          return item;
        })],
        lastId: prevState.lastId + 1,
      }),
      this.putInLocalStorage);
    }
  }

  render() {
    let filtredList;

    switch (this.state.activeTab) {
      case 'All':
        filtredList = this.state.list;
        break;
      case 'Active':
        filtredList = this.state.list.filter(item => !item.done);
        break;
      case 'Completed':
        filtredList = this.state.list.filter(item => item.done);
        break;
      default:
        filtredList = this.state.list;
        break;
    }

    return (
      <section className="todoapp">
        <Input addTodo={this.addTodo} />

        <TodoList
          listNotToShow={this.state.list}
          list={filtredList}
          toDelete={this.toDelete}
          clearDone={this.clearDone}
          toggled={this.toggled}
          toggledAll={this.toggledAll}
          activeFilter={this.activeFilter}
          props={this.state}
          editText={this.editText}
          editEnter={this.editEnter}
          addTodo={this.addTodo}
        />

      </section>
    );
  }
}

export default App;
