import React, { useContext, useRef } from 'react';
import { DispatchContext, StateContext } from '../Storage/storageFiles';
import cn from 'classnames';

export const Header = () => {
  const dispatch = useContext(DispatchContext);
  const { todos, newTodo, focusNewTodo } = useContext(StateContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const allTodosComplete = todos.reduce(
    (prev, todo) => prev && todo.completed,
    true,
  );

  const addNewTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch({ type: 'add' });
      dispatch({ type: 'changeTodo', text: '' });
    }
  };

  // useEffect(() => {
  //   if (focusNewTodo) {
  //     inputRef.current?.focus();
  //   } else {
  //     inputRef.current?.blur();
  //   }
  // }, [focusNewTodo]);

  if (focusNewTodo) {
    inputRef.current?.focus();
  } else {
    inputRef.current?.blur();
  }

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', { active: allTodosComplete })}
          data-cy="ToggleAllButton"
          onClick={() =>
            dispatch({ type: 'setAllCompleate', use: allTodosComplete })
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
          onClick={() => dispatch({ type: 'setFocudNewTodo' })}
          onBlur={() => dispatch({ type: 'setFocudNewTodo' })}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch({
              type: 'changeTodo',
              text: e.target.value.toString(),
            })
          }
        />
      </form>
    </header>
  );
};
