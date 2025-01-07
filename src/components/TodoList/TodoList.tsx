import { useAppContext } from '../../context/AppProvider';
import classNames from 'classnames';
import { getFilteredItems } from '../../utils/utils';
import React from 'react';

export const TodoList = () => {
  const {
    todos,
    setTodos,
    filter,
    isEditingId,
    setIsEditingId,
    setEditTitle,
    editTitle,
  } = useAppContext();

  const deleteTodo = (id: number) => {
    const filteredTodos = todos.filter(todo => todo.id !== id);

    setTodos(filteredTodos);
    localStorage.setItem('todos', JSON.stringify(filteredTodos));
  };

  const handleCompleted = (id: number) => {
    const todoToUpdate = todos.find(todo => todo.id === id);

    if (!todoToUpdate) {
      return;
    }

    const updatedAll = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );

    setTodos(updatedAll);
    localStorage.setItem('todos', JSON.stringify(updatedAll));
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(event.target.value);
  };

  const handleDoubleClick = (id: number, value: string) => {
    setIsEditingId(id);
    setEditTitle(value);
  };

  const handleSubmit = (id: number) => {
    if (editTitle.trim() === '') {
      deleteTodo(id);

      return;
    }

    const updatedAll = todos.map(todo =>
      todo.id === id ? { ...todo, title: editTitle.trim() } : todo,
    );

    setTodos(updatedAll);
    localStorage.setItem('todos', JSON.stringify(updatedAll));
    setIsEditingId(0);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEditingId(0);
      setEditTitle('');
    }
  };

  const filteredTodos = getFilteredItems(todos, filter);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {filteredTodos.map(({ id, title, completed }) => (
        <div
          key={id}
          data-cy="Todo"
          className={classNames('todo', { completed: completed })}
        >
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={completed}
              onChange={() => handleCompleted(id)}
            />
          </label>

          {isEditingId === id ? (
            <form
              onSubmit={event => {
                event.preventDefault();
                handleSubmit(id);
              }}
            >
              <input
                type="text"
                data-cy="TodoTitleField"
                value={editTitle}
                className="todoapp__new-todo"
                placeholder="Empty todo will be deleted"
                onBlur={() => handleSubmit(id)}
                onKeyUp={handleKeyUp}
                onChange={handleInput}
                autoFocus
              />
            </form>
          ) : (
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => {
                handleDoubleClick(id, title);
              }}
            >
              {title}
            </span>
          )}

          {/* Remove button appears only on hover */}
          {isEditingId !== id && (
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => deleteTodo(id)}
            >
              ×
            </button>
          )}
        </div>
      ))}
    </section>
  );
};
