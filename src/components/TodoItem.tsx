/* eslint-disable jsx-a11y/label-has-associated-control */
import cn from 'classnames';
import { Todo } from '../types/todo';
import { useContext } from 'react';
import { DispatchContext, StateContext } from '../Store';
import { TodoTitleField } from './TodoTitleField';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { editingTodo } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleDoubleClick = () => {
    dispatch({ type: 'setEditingTodo', payload: todo });
  };

  const handleTodoCheck = () => {
    const newTodo: Todo = {
      ...todo,
      completed: !todo.completed,
    };

    dispatch({ type: 'updateTodo', payload: newTodo });
  };

  const handleDelete = () => {
    dispatch({ type: 'deleteTodo', payload: todo.id });
  };

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={handleTodoCheck}
        />
      </label>

      {editingTodo?.id === todo.id ? (
        <TodoTitleField />
      ) : (
        <>
          {' '}
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handleDoubleClick}
          >
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleDelete}
          >
            ×
          </button>{' '}
        </>
      )}
    </div>
  );
};
