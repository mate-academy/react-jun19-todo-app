import React from 'react';
import { useTodoContext } from '../context/TodoContext';
import { Todo } from '../types/Todo';


export const Header: React.FC = () => {
  const { todos, setTodos, title, setTitle } = useTodoContext();

  const addTodo = (text: string) => {
    const newTodo: Todo = { id: Date.now(), title: text, completed: false};

    setTodos([...todos, newTodo]);
    localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    addTodo(title.trim());
    setTitle('');
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
        <form onSubmit={handleSubmit}>
          <input
            data-cy="NewTodoField"
            type="text"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </form>
    </header>
  )
}
