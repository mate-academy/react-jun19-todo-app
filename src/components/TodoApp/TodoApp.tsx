import React, { useContext } from 'react';

import { Header } from '../Header';
import { Main } from '../Main';
import { Footer } from '../Footer';
import { StateContext } from '../TodosContext';

export const TodoApp: React.FC = () => {
  const todos = useContext(StateContext);

  return (
    <div className="todoapp">
      <Header />

      {!!todos.length && (
        <>
          <Main />
          <Footer />
        </>
      )}
    </div>
  );
};
