import { TodoList } from '../components/TodoList';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { TodoContext } from '../store/TodoContext';
import { useContext } from 'react';
import '../styles/todoapp.scss';

export const TodoApp = () => {
  const { todos } = useContext(TodoContext);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {todos.length > 0 && <TodoList />}
        {todos.length > 0 && <Footer />}
      </div>
    </div>
  );
};
