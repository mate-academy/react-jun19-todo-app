import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { DispatchContext, StateContext } from '../store/Store';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

export const Header = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [title, setTitle] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const isAllCompleted = useMemo(
    () => todos.every(todo => todo.completed),
    [todos],
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos.length]);

  const toggleAllCompleted = () => {
    dispatch({ type: 'toggleAllCompleted' });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim() === '') {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
    };

    dispatch({ type: 'addTodo', payload: newTodo });
    setTitle('');
  };

  return (
    <header className="todoapp__header">
      {todos.length !== 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: isAllCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAllCompleted}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          style={{ boxSizing: 'border-box' }}
          ref={inputRef}
          autoFocus
          onChange={handleTitleChange}
        />
      </form>
    </header>
  );
};
