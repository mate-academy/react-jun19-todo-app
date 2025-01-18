import { TodoList } from '../components/TodoList';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { TodoContext } from '../store/TodoContext';
import { useContext } from 'react';

export const TodoApp = () => {
  const { todos } = useContext(TodoContext);

  return (
    <div className="todoapp">
      <Header /> {todos.length && <TodoList />}
      {todos.length && <Footer />}
    </div>
  );
};
