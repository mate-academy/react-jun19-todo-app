/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useRef } from 'react';
import { Todos } from './components/Todos';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DispatchContext, StateContext } from './Storage/storageFiles';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const temper = useRef(true);

  useEffect(() => {
    if (temper.current) {
      temper.current = false;

      try {
        const storedTodos: Todo[] = JSON.parse(
          localStorage.getItem('todos') || '[]',
        );

        dispatch({ type: 'setTodos', tod: storedTodos });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to load todos from localStorage:', error);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <Todos />
        <Footer />
      </div>
    </div>
  );
};
