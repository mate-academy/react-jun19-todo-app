/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
import { ChangeEvent, useContext, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoContext } from '../store/TodoContext';
import './TodoApp.scss';
import classNames from 'classnames';
import { FilteredTodoContext } from '../store/FilterdTodoContext';
import { Status } from '../types/Status';

/* eslint-disable import/extensions */
type Props = { todo: Todo };

function filterTodos(isCompleted) {
  switch (isCompleted) {
    case isCompleted:
      return Status.completed;
    case !isCompleted:
      return Status.active;
    default:
      return Status.all;
  }
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodoContext);
  const { filteredTodos, setfilteredTodos, status, setStatus } =
    useContext(FilteredTodoContext);
  const index = todos.findIndex(t => t.id === todo.id);
  const [isEdit, setIsEdit] = useState(false);
  const [tempTitle, setTempTitle] = useState(todo.title);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTempTitle(event.target.value);
  };

  function handleToggleCompleted() {
    const isCompleted = !todos[index].completed;

    todos[index].completed = isCompleted;

    setTodos(todos);
    setfilteredTodos([...todos].filter(t => t.completed === !isCompleted));
  }

  function handleDoubleClick() {
    setIsEdit(true);
  }

  function handleRemoveTodo() {
    todos.splice(index, 1);
    setTodos([...todos]);
    setfilteredTodos(todos);
  }

  function onEditFormSubmit() {
    // event.preventDefault();
    if (!tempTitle.trim()) {
      handleRemoveTodo();
    }

    if (tempTitle.trim()) {
      todos[index].title = tempTitle.trim();
    }

    setTodos([...todos]);
  }

  function handleOnBlur() {
    // event.preventDefault();
    if (!tempTitle.trim()) {
      handleRemoveTodo();
    }

    if (tempTitle.trim()) {
      todos[index].title = tempTitle.trim();
    }

    setTodos([...todos]);
    setIsEdit(false);
  }

  function handleCancelClick(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      setIsEdit(false);
    }
  }

  return (
    <>
      {!isEdit ? (
        <div
          data-cy="Todo"
          className={classNames('todo', { completed: todo.completed })}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={handleToggleCompleted}
            />
          </label>

          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleDoubleClick}
          >
            {todo.title}
          </span>

          {/* Remove button appears only on hover */}
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleRemoveTodo}
          >
            ×
          </button>
        </div>
      ) : (
        <div data-cy="Todo" className="todo">
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
            />
          </label>

          {/* This form is shown instead of the title and remove button */}
          <form onSubmit={onEditFormSubmit}>
            <input
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              name="title"
              value={tempTitle}
              onChange={handleTitleChange}
              onBlur={handleOnBlur}
              onKeyUp={handleCancelClick}
            />
          </form>
        </div>
      )}
    </>
  );
};
