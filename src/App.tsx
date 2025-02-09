import React, { useEffect, useRef, useState } from 'react';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { useTodos } from './components/TodosContext';

export const App: React.FC = () => {
  const { todos, setTodos } = useTodos();
  const [query, setQuery] = useState<string>('');

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos]);

  const isAllCompleted = todos.every(todo => todo.completed);

  const handleAllTodoCompleted = () => {
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !isAllCompleted,
    }));

    setTodos(updatedTodos);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          query={query}
          setQuery={setQuery}
          isAllCompleted={isAllCompleted}
          handleAllTodoCompleted={handleAllTodoCompleted}
          inputRef={inputRef}
        />

        {todos.length > 0 && <TodoList />}

        {todos.length > 0 && <Footer />}
      </div>
    </div>
  );
};
