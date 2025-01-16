import React, { useRef, useState, useEffect, useCallback, useContext } from 'react';
import { Todo } from '../../types/Todo';
import { DispatchContext, StateContext } from '../GlobalStateProvider/GlobalStateProvider';
import cn from 'classnames';

enum ErrorMessage {
  emptyTitle = 'Title should not be empty',
}

type HeaderProps = {
  error: ErrorMessage | null;
  setError: React.Dispatch<React.SetStateAction<ErrorMessage | null>>;
}

const Header: React.FC<HeaderProps> = React.memo(({ setError }) => {

  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);
  const [toBeDone, setToBeDone] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos]);


  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!toBeDone.trim()) {
      setError(ErrorMessage.emptyTitle);

      window.setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }

    const newTempTodo: Todo = {
      id: +Date.now(),
      title: toBeDone.trim(),
      completed: false,
    };

    dispatch({ type: 'addTodo', payload: newTempTodo });
    setToBeDone('');
    
  }, [toBeDone]);


  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit(e);
      }
    },
    [handleSubmit],
  );


  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={() => dispatch({ type: 'toggleTodos' })}
        />
      )}

      <form onSubmit={handleSubmit} onKeyDown={handleKeyPress}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={toBeDone}
          onChange={(e) => setToBeDone(e.target.value)}
        />
      </form>
    </header>
  );
});

Header.displayName = 'Header';
export default Header;

