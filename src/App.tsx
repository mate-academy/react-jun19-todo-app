/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useRef, useState } from 'react';
import { Header } from './component/Header';
import { TodoList } from './component/TodoList';
import { Footer } from './component/Footer';
import { Status } from './types/statys';
import { Todo } from './component/TodoContext';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // список завдань
  const [filter, setFilter] = useState<Status>(Status.ALL); // фільтр завдань
  const inputRef = useRef<HTMLInputElement>(null);

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header setTodos={setTodos} inputRef={inputRef} todos={todos} />

        {todos.length > 0 && (
          <>
            <TodoList todos={todos} filter={filter} setTodos={setTodos} />

            <Footer
              todos={todos}
              filter={filter}
              setFilter={setFilter}
              clearCompleted={clearCompleted}
              completedCount={todos.filter(todo => todo.completed).length}
            />
          </>
        )}
      </div>
    </div>
  );
};
