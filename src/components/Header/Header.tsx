import React, { useContext, useRef } from 'react';
import { StateContext, DispatchContext } from '../../storage/Storage';
import cn from 'classnames';

export const Header = () => {
  const { todos, newTodo, focusTodo } = useContext(StateContext);

  const dispatch = useContext(DispatchContext);

  const addNewTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTodo.trim()) {
      dispatch({ type: 'add' });
      dispatch({
        type: 'changeTodo',
        title: '',
      });
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  if (focusTodo) {
    inputRef.current?.focus();
  } else {
    inputRef.current?.blur();
  }

  const allTodosCompleted = todos.reduce((prev, todo) => {
    return prev && todo.completed;
  }, true);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: allTodosCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={() =>
            dispatch({ type: 'setAllCompleted', use: allTodosCompleted })
          }
        />
      )}

      <form onSubmit={addNewTodo}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodo}
          onClick={() => dispatch({ type: 'setFocusedTodo' })}
          onBlur={() => dispatch({ type: 'setFocusedTodo' })}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({
              type: 'changeTodo',
              title: e.target.value.toString(),
            })
          }
        />
      </form>
    </header>
  );
};
