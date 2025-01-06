/* eslint-disable import/extensions */
import { useEffect } from 'react';
import { FilterProvider } from '../context/FilterContext';
import { TodosProvider } from '../context/TodosContext';
import { Footer } from './Footer';
import { Header } from './Header';
import { TodoList } from './TodoList';

export const TodoApp = () => {
  useEffect(() => {
    const data = localStorage.getItem('todos');

    if (!data) {
      localStorage.setItem('todos', JSON.stringify([]));
    }
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <TodosProvider>
        <div className="todoapp__content">
          <Header />
          <FilterProvider>
            <TodoList />
            <Footer />
          </FilterProvider>
        </div>
      </TodosProvider>
    </div>
  );
};
