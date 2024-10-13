import React, { useState } from 'react';
import { useGlobalState } from '../store/Store';
import { TodoItem } from './TodoItem';
import { Header } from './Header';
import { Footer } from './Footer';
import { TodoFilter } from '../enums/TodoFilter';

export const TodoApp: React.FC = () => {
  const [filter, setFilter] = useState<TodoFilter>(TodoFilter.All);
  const { todos } = useGlobalState();

  const filteredTodos = todos.filter(todo => {
    if (filter === TodoFilter.Active) {
      return !todo.completed;
    }

    if (filter === TodoFilter.Completed) {
      return todo.completed;
    }

    return true;
  });

  // const activeTodoCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {todos.length > 0 && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {filteredTodos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </section>

            <Footer
              filter={filter}
              setFilter={setFilter}
              // activeTodoCount={activeTodoCount}
            />
          </>
        )}
      </div>
    </div>
  );
};
