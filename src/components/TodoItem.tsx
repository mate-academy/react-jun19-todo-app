import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext, StateContext } from '../context/GlobalState';

interface TodoItemProps {
  todoItem: Todo;
}

export function TodoItem({ todoItem }: TodoItemProps) {
  const [itemEditingId, setItemEditingId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState<string>('');

  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleDeleteTodo(id: number) {
    const updatedTodos = todos.filter(todo => {
      return todo.id !== id;
    });

    dispatch({ type: 'update', payload: updatedTodos });
  }

  function handleEditSubmit() {
    const trimmedTitle = newTitle.trim();

    if (trimmedTitle === '') {
      handleDeleteTodo(todoItem.id);

      return;
    }

    const updatedTodos = todos.map(todo => {
      if (todo.id === todoItem.id) {
        return { ...todo, title: trimmedTitle };
      }

      return todo;
    });

    dispatch({ type: 'update', payload: updatedTodos });

    setItemEditingId(null);
    setNewTitle('');
  }

  function handleToggleStatus(id: number) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    dispatch({ type: 'update', payload: updatedTodos });
  }

  function handleDoubleClick() {
    setNewTitle(todoItem.title);
    setItemEditingId(todoItem.id);
  }

  useEffect(() => {
    if (itemEditingId === todoItem.id && inputRef.current) {
      inputRef.current.focus();
      setNewTitle(todoItem.title);
    }
  }, [itemEditingId, todoItem.id, todoItem.title]);

  function handleCancel(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      setItemEditingId(null);
      setNewTitle(todoItem.title);
    }
  }

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todoItem.completed })}
      key={todoItem.id}
    >
      <label className="todo__status-label" htmlFor={`${todoItem.id}`}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <input
          id={`${todoItem.id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todoItem.completed}
          onClick={() => {
            handleToggleStatus(todoItem.id);
          }}
        />
      </label>
      {todoItem.id !== itemEditingId && (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => handleDoubleClick()}
          >
            {todoItem.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => {
              handleDeleteTodo(todoItem.id);
            }}
          >
            ×
          </button>
        </>
      )}

      {todoItem.id === itemEditingId && (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleEditSubmit();
          }}
        >
          <input
            ref={inputRef}
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={newTitle}
            onBlur={handleEditSubmit}
            onChange={e => {
              setNewTitle(e.target.value);
            }}
            onKeyUp={handleCancel}
          />
        </form>
      )}
    </div>
  );
}
