import React, { useContext, useEffect, useState } from 'react';
import { Header } from './Header';
import { TodoList } from './TodoList';
import { Footer } from './Footer';
import { TodosContext } from '../context/TodosContex';

export const Content: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const [visibleTodos, setVisibleTodos] = useState(todos);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const savedTodos = localStorage.getItem('todos');

  useEffect(() => {
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    setVisibleTodos(todos);
  }, [todos]);

  return (
    <>
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList visibleTodos={visibleTodos} />

        {todos.length > 0 && (
          <Footer
            visibleTodos={visibleTodos}
            setVisibleTodos={setVisibleTodos}
          />
        )}
      </div>
    </>
  );
};
