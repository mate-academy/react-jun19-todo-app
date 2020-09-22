import React, { useState, useMemo, useEffect } from 'react';
import { TodoApp } from './components/TodoApp';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';

function App() {
  const [todos, setTodos] = useState([]);
  const [filterBy, setFilterBy] = useState('all');

  useEffect(() => {
    if (localStorage.getItem('list') !== null) {
      setTodos(JSON.parse(localStorage.getItem('list')));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = useMemo(() => todos.filter(todo => ((filterBy === 'all')
    ? todo
    : todo.completed === filterBy)), [filterBy, todos]);

  const getTodo = (id, title, completed = false) => {
    setTodos([...todos, {
      id,
      title,
      completed,
    }]);
  };

  const editingTodo = (id, newTitle) => {
    setTodos(todos.map(todo => (todo.id === id
      ? ({ ...todo, title: newTitle })
      : ({ ...todo }))));
  };

  const changeCompleted = (id) => {
    setTodos(todos.map(todo => ((todo.id === id)
      ? { ...todo, completed: !todo.completed }
      : todo)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => todo.completed === false));
  };

  const toggleCompleted = () => {
    if (todos.length && todos.every(todo => todo.completed)) {
      setTodos(todos.map(todo => ({ ...todo, completed: false })));

      return;
    }

    setTodos(todos.map(todo => ({ ...todo, completed: true })));
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos App</h1>

        <TodoApp getTodo={getTodo} />
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          checked={todos.length > 0 && todos.every(todo => todo.completed)}
          onClick={() => toggleCompleted()}
          readOnly
        />
        <label
          htmlFor="toggle-all"
        >
          Mark all as complete
        </label>

        <TodoList
          todos={filteredTodos}
          changeCompleted={changeCompleted}
          deleteTodo={deleteTodo}
          editingTodo={editingTodo}
        />
      </section>

      {
        !todos.length
        || (
          <TodosFilter
            todosLeft={
              todos
                .filter(todo => todo.completed === false)
                .length
            }
            showTodos={setFilterBy}
            clearCompleted={clearCompleted}
            completedTodos={todos.some(todo => todo.completed)}
          />
        )
      }
    </section>
  );
}

export default App;
