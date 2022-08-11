import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocalStorage } from '../CustomHooks/useLocalStorage';
import { SortLinks } from '../types/SortLinks';
import { Todo } from '../types/Todo';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';

export const TodoApp: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const { pathname } = useLocation();

  const addNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!query) {
      return;
    }

    const newTodo = {
      id: +new Date(),
      title: query,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setQuery('');
  };

  const deleteTodo = (id: number): void => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const deleteCompleted = (): void => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const toggleTodoStatus = (id: number): void => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const updateTitle = (id: number, title: string): void => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          title,
        };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const visibleTodos = todos.filter(todo => {
    switch (pathname) {
      case SortLinks.Active:
        return !todo.completed;
      case SortLinks.Completed:
        return todo.completed;
      default:
        return '/';
    }
  });

  const toggleAllTodos = () => {
    const isTodosMatched = todos.every(todo => todo.completed);
    let allTodos;

    if (isTodosMatched) {
      allTodos = todos.map(todo => {
        return {
          ...todo,
          completed: !todo.completed,
        };
      });
    } else {
      allTodos = todos.map(todo => {
        return {
          ...todo,
          completed: true,
        };
      });
    }

    setTodos(allTodos);
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={addNewTodo}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={query}
            onChange={event => {
              setQuery(event.target.value);
            }}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onChange={toggleAllTodos}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList
          items={visibleTodos}
          toggleTodoStatus={toggleTodoStatus}
          deleteTodo={deleteTodo}
          updateTitle={updateTitle}
        />
      </section>
      {todos.length > 0
        && <TodosFilter todos={todos} deleteCompleted={deleteCompleted} />}
    </div>
  );
};
