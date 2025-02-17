import { useContext, useRef, useState } from 'react';
import { Status } from '../types/statys';
import { TodoContext } from './TodoContext';
import { Header } from './Header';
import { TodoList } from './TodoList';
import { Footer } from './Footer';

export const AppContent: React.FC = () => {
  const [filter, setFilter] = useState<Status>(Status.ALL);
  const inputRef = useRef<HTMLInputElement>(null);

  const todoContext = useContext(TodoContext);

  if (!todoContext) {
    throw new Error('useContext must be used within a TodoProvider');
  }

  const { todos, clearCompleted } = todoContext;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header inputRef={inputRef} />

        <TodoList filter={filter} inputRef={inputRef} />

        {todos.length > 0 && (
          <Footer
            filter={filter}
            setFilter={setFilter}
            todos={todos}
            clearCompleted={clearCompleted}
            completedCount={todos.filter(todo => todo.completed).length}
          />
        )}
      </div>
    </div>
  );
};
