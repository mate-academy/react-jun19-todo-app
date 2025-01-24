import { FormEvent, useContext, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DispatchContext, StateContext } from './Store';
import { Todo } from '../types/Todo';
import { getCompletedTodosArray } from '../services';

export const Header = () => {
  const { todos, newTodoTitle } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const handleSetNewTodoTitle = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch({ type: 'setNewTodoTitle', payload: event.target.value });
  };

  const handleAddTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newTodoTitle.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: newTodoTitle.trim(),
      completed: false,
    };

    dispatch({ type: 'addTodo', payload: newTodo });
    dispatch({ type: 'setNewTodoTitle', payload: '' });
  };

  const validation = todos.every(todo => todo.completed === true);

  const handleToggleAll = () => {
    dispatch({ type: 'setAllCompleted', payload: !validation });
  };

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todos.length === getCompletedTodosArray(todos).length,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      <form onSubmit={handleAddTodo}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={handleSetNewTodoTitle}
        />
      </form>
    </header>
  );
};
