/* eslint-disable object-curly-newline */ /* eslint-disable @typescript-eslint/quotes */ /* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import './styles/todoapp.scss';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FilteredTodoContext } from './store/FilterdTodoContext';
import { TodoContext } from './store/TodoContext';
export const App: React.FC = () => {
  const { todos } = useContext(TodoContext);
  const { filteredTodos } = useContext(FilteredTodoContext);

  return (
    <div className="todoapp">
      <Header /> {todos.length && <TodoList />}
      {todos.length && <Footer />}
    </div>
  );
};
