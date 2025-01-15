import { useContext } from 'react';
import { StateContext, DispatchContext } from '../../storage/Storage';
import cn from 'classnames';

export const TodoList = () => {
  const { todos, sortTodos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const todosFilter = todos.filter(todo => {
    if (sortTodos === 'Active') {
      return !todo.completed;
    }

    if (sortTodos === 'Completed') {
      return todo.completed;
    }

    return true;
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todosFilter.map(todo => (
        <div
          data-cy="Todo"
          className={cn('todo', { completed: todo.completed })}
          key={todo.id}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => dispatch({ type: 'checked', id: todo.id })}
            />
          </label>

          {!todo.changed && (
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() =>
                dispatch({ type: 'setChanged', id: todo.id })
              }
            >
              {todo.title}
            </span>
          )}

          {todo.changed && (
            <form
              onSubmit={e => {
                e.preventDefault();
                dispatch({ type: 'setChanged', id: todo.id });
              }}
            >
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={todo.title}
                autoFocus
                onKeyUp={e => {
                  if (e.key === 'Escape') {
                    dispatch({ type: 'cancelChangingTodo', id: todo.id });
                    dispatch({ type: 'setChanged', id: todo.id });
                  }
                }}
                onChange={e => {
                  dispatch({
                    type: 'changed',
                    id: todo.id,
                    title: e.target.value,
                  });
                }}
                onBlur={() => dispatch({ type: 'setChanged', id: todo.id })}
              />
            </form>
          )}

          {!todo.changed && (
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => dispatch({ type: 'remove', id: todo.id })}
            >
              ×
            </button>
          )}
        </div>
      ))}
    </section>
  );
};
