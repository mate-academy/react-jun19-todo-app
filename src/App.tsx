/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { useLocalStorage } from './UseLocalStorage';
import { Filter } from './types/Filter';

function filteredTodos(todos:Todo[], filter:string) {
  const returnArr = [...todos];

  switch (filter) {
    case Filter.ACTIVE:
      return returnArr.filter(todo => !todo.completed);
    case Filter.COMPLETED:
      return returnArr.filter(todo => todo.completed);
    default:
      return returnArr;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const { filter = '' } = useParams();
  const [isChecked, setIsChecked] = useState(false);
  const visibleTodos = filteredTodos(todos, filter);

  const handleAddTodo = (title: string) => {
    const newTodo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodos(todos.map(todo => (
      todo.id === updatedTodo.id ? updatedTodo : todo)));
  };

  const toggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !allCompleted,
    }));

    setTodos(updatedTodos);
  };

  const handleChecked = () => {
    setIsChecked(!isChecked);
    toggleAll();
  };

  const clearCompleted = () => {
    setTodos(todos.filter(({ completed }) => !completed));
  };

  return (
    <div className="todoapp">
      <Header handleAddTodo={handleAddTodo} />

      {todos.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onChange={handleChecked}
              checked={isChecked}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <TodoList
              todos={visibleTodos}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            />
          </section>
          <Footer
            todos={todos}
            clearCompleted={clearCompleted}
          />

        </>
      )}
    </div>
  );
};
