import React, { useContext, useEffect, useRef, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { Todo } from '../types/Todo';

type TodoItemProps = {
  item: Todo;
};

export const TodoItem = ({ item }: TodoItemProps) => {
  const { todos, setTodos } = useContext(TodoContext);
  const [editingTitle, setEditingTitle] = useState<string>(item.title);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const inputTitle = useRef<HTMLInputElement>(null);

  const handleRemoveTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleChecked = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );

    setTodos(updatedTodos);
  };

  const handleTodoTitleChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTitle.trim() && editingTitle !== item.title) {
      setTodos(
        todos.map(todo =>
          todo.id === item.id ? { ...todo, title: editingTitle } : todo,
        ),
      );
    }

    setIsEditing(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setEditingTitle(item.title);
      setIsEditing(false);
    }
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    if (isEditing) {
      inputTitle.current?.focus();
    }
  }, [isEditing]);

  return (
    <div data-cy="Todo" className={`todo ${item.completed && 'completed'}`}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={item.completed}
          aria-label={
            item.completed ? 'Mark as incomplete' : 'Mark as complete'
          }
          onChange={() => handleChecked(item.id)}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleTodoTitleChange}>
          <input
            type="text"
            data-cy="TodoTitleField"
            className="todoapp__edited-todo"
            value={editingTitle}
            onChange={e => setEditingTitle(e.target.value)}
            onBlur={handleTodoTitleChange}
            onKeyUp={handleKeyUp}
            ref={inputTitle}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleDoubleClick}
          >
            {item.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleRemoveTodo(item.id)}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
