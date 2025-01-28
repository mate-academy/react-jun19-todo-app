/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { TodoProvider } from './context/TodoContext';

export const App: React.FC = () => {
  return (
    <TodoProvider>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <Header
          // todos={todos}
          // handleAddTodo={handleAddTodo}
          // handleToggling={handleToggling}
          />

          <TodoList
          // todos={visibleTodos}
          // handleDeleteTodo={handleDeleteTodo}
          // handleUpdateTodo={handleUpdateTodo}
          />

          <Footer
          // todos={todos}
          // todosType={todosType}
          // handleTodosTypeChange={handleTodosTypeChange}
          // handleDeleteTodo={handleDeleteTodo}
          />
        </div>
      </div>
    </TodoProvider>
  );
};
