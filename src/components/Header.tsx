import React, { useContext, useEffect, useRef } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { Todo } from '../types/Todo';

export const Header = () => {
  const { todos, setTodos, title, setTitle } = useContext(TodoContext);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    input.current?.focus();
  }, [todos]);

  const handleChangeAllStatus = () => {
    const hasActiveTodo = todos.some(todo => !todo.completed);

    setTodos(
      todos.map(todo => {
        return {
          ...todo,
          completed: hasActiveTodo,
        };
      }),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() === '') {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: title.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${todos.every(todo => todo.completed) ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={handleChangeAllStatus}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          ref={input}
          onChange={e => setTitle(e.target.value)}
        />
      </form>
    </header>
  );
};
