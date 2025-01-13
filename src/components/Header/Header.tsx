import React from 'react';
import { useTodoContext } from '../../context/TodoContext';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';


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

  const toogleAllTodos = () => {
    const allCompleted = todos.every(todo => todo.completed);

    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !allCompleted,
    }));

    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: todos.every(todo => todo.completed),
          })}
        data-cy="ToggleAllButton"
        onClick={toogleAllTodos}
      />
      )}
      {/* Add a todo on form submit */}
        <form onSubmit={handleSubmit}>
          <input
            data-cy="NewTodoField"
            type="text"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        </form>
    </header>
  )
}
