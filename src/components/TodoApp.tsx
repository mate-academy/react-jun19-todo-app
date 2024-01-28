import { useContext } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { Main } from './Main';
import { TodosContext } from '../TodosContext.tsx/TodosContext';

export const TodoApp = () => {
  const { todos } = useContext(TodosContext);

  return (
    <div className="todoapp">
      <Header />

      <Main />
      {todos.length > 0 && (<Footer />)}
    </div>
  );
};
