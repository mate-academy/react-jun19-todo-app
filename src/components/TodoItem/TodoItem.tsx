import React, { useState, useRef } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { useTodoContext } from '../../context/TodoContext';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos, newTitle, setNewTitle } = useTodoContext();
  const [isEditForm, setIsEditForm] = useState(false);
  const editInputRef = useRef<HTMLInputElement>(null);

  const handleDoubleClick = () => {
    setIsEditForm(true);
    setNewTitle(todo.title);
    setTimeout(() => {
      editInputRef.current?.focus();
    }, 0);
  }

  const editTitle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const newEditTitle = form.get('TodoTitleField') as string;

    if (!newEditTitle.trim()) {
      deleteTodo(todo.id);
    } else if (newEditTitle !== todo.title) {
      editTodo(newEditTitle.trim(), todo.id);
    }

    setTimeout(() => {
      setIsEditForm(false);
    }, 100);
  };

  const handleTitleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value.trim();

    if (!newTitle) {
      deleteTodo(todo.id);
      return;
    }

    if (newTitle !== todo.title) {
      editTodo(newTitle, todo.id);
    }

    setIsEditForm(false);
  };

  const editTodo = (title: string, id: number) => {
    const updatedTodos = todos.map(todo => todo.id === id ? { ...todo, title } : todo);

    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsEditForm(false);
    }
  };

  const deleteTodo = (id: number) => {
    const filteredTodos = todos.filter(todo => todo.id !== id);

    setTodos(filteredTodos);
    localStorage.setItem('todos', JSON.stringify(filteredTodos));

    const inputField = document.querySelector(".todoapp__new-todo") as HTMLInputElement;
    inputField!.focus();
  }

  const toggleTodoStatus = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }

  return (
    <div data-cy="Todo" className={classNames("todo", {completed: todo.completed})} onDoubleClick={handleDoubleClick}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => toggleTodoStatus(todo.id)}
        />
      </label>

      {isEditForm ? (
        <form onSubmit={editTitle}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder='What needs to be done?'
            value={newTitle}
            name="TodoTitleField"
            ref={editInputRef}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleTitleBlur}
            onKeyUp={handleKeyUp}
          />
        </form>
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
        >
          {todo.title}
        </span>
      )}


      {/* Remove button appears only on hover */}
      {!isEditForm && (
      <button type="button" className="todo__remove" data-cy="TodoDelete" onClick={() => deleteTodo(todo.id)} >
        ×
      </button>
      )}
    </div>
  )
}
