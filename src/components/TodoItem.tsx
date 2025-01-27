import cn from 'classnames';

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Actions, Todo } from '../types/Todo';
import { DispatchContext, StateContext } from '../Store';

type Props = {
  todo: Todo;
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const { renamingTodo } = React.useContext(StateContext);

  const isRenaming = renamingTodo === todo.id;

  const todoField = useRef<HTMLInputElement>(null);

  const dispatch = useContext(DispatchContext);

  const handleRenamingTodo = useCallback(
    (id: number | null) => {
      if (dispatch) {
        dispatch({ type: Actions.RenameTodo, payload: id });
      }
    },
    [dispatch],
  );

  const handleDelete = () => {
    if (dispatch) {
      dispatch({ type: Actions.DeleteTodo, payload: todo.id });
    }
  };

  const handleToggle = () => {
    if (dispatch) {
      dispatch({ type: Actions.ToggleTodo, payload: todo.id });
    }
  };

  const updateTodo = () => {
    if (dispatch) {
      dispatch({
        type: Actions.UpdateTodo,
        payload: {
          ...todo,
          title: inputValue.trim(),
        },
      });
    }
  };

  const handleEditTodo = () => {
    handleRenamingTodo(todo.id);
    setInputValue(todo.title);
  };

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmitChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleRenamingTodo(null);
    if (inputValue === '') {
      handleDelete();

      return;
    }

    if (inputValue !== todo.title) {
      updateTodo();
      handleRenamingTodo(null);

      return;
    }
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleRenamingTodo(null);

        return;
      }
    };

    window.addEventListener('keyup', handleEsc);

    return () => {
      window.removeEventListener('keyup', handleEsc);
    };
  }, [handleRenamingTodo]);

  useEffect(() => {
    if (todoField.current) {
      todoField.current.focus();
    }
  }, [isRenaming]);

  return (
    <div
      key={todo.id}
      data-cy="Todo"
      className={cn('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={handleToggle}
        />
      </label>

      {!isRenaming && (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={handleEditTodo}
        >
          {todo.title}
        </span>
      )}

      {isRenaming && (
        <form onSubmit={handleSubmitChange} onBlur={handleSubmitChange}>
          <input
            data-cy="TodoTitleField"
            ref={todoField}
            className="todo__title-field"
            type="text"
            value={inputValue}
            onChange={handleChangeValue}
          />
        </form>
      )}

      {!isRenaming && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={handleDelete}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default TodoItem;
