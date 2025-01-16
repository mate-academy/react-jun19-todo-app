import React, { useContext, useState, useCallback } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { DispatchContext } from '../GlobalStateProvider/GlobalStateProvider';


type TodoItemProps = {
  todo: Todo;
};


const TodoItem: React.FC<TodoItemProps> = React.memo(({ todo }) => {

  const { id, title, completed } = todo;
  const dispatch = useContext(DispatchContext);
  const [isEditingTodo, setIsEditingTodo] = useState(false);
  const [editedTodoTitle, setEditedTodoTitle] = useState(title);

  const handleSubmitEditedTodo = useCallback(() => {
    const newTrimmedTitle = editedTodoTitle.trim();

    if (!newTrimmedTitle) {
      dispatch({ type: 'deleteTodo', payload: todo });
      return;
    }

    if (newTrimmedTitle !== title) {
      dispatch({
        type: 'updateTodoTitle',
        payload: { ...todo, title: newTrimmedTitle },
      });
    }

    setIsEditingTodo(false);
  }, [dispatch, todo, title, editedTodoTitle]);


  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmitEditedTodo();
    }
  };


  const handleCancelEditTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setEditedTodoTitle(title);
      setIsEditingTodo(false);
    }
  };


  const handleBlurTodo = () => {
    handleSubmitEditedTodo();
  };


  return (
    <div data-cy="Todo" className={cn("todo", { "completed": completed })}>
      <label className="todo__status-label" htmlFor={`todo-${id}`}>
        {" "}
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          id={`todo-${id}`}
          aria-readonly={true}
          onChange={() => dispatch({ type: 'setTodoComplete', payload: todo })}
        />
      </label>

      {isEditingTodo ? (
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            value={editedTodoTitle}
            placeholder="Empty todo will be deleted"
            onChange={(e) => setEditedTodoTitle(e.target.value)}
            onBlur={handleBlurTodo}
            onKeyDown={handleKeyPress}
            autoFocus
            onKeyUp={handleCancelEditTodo}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEditingTodo(true)}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => dispatch({ type: 'deleteTodo', payload: todo })}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
});

TodoItem.displayName = 'TodoItem';
export default TodoItem;

