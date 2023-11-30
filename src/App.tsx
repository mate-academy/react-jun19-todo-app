import React, { useContext } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { StateContext } from './context/TodosContext';

export const App: React.FC = () => {
  const { todos } = useContext(StateContext);

  return (
    <div className="todoapp">
      <Header />
      <Main />

      {todos.length > 0 && (
        <Footer />
      )}
    </div>
  );
};
