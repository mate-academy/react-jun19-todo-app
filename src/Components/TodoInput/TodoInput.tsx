import { useContext, useEffect, useRef, useState } from 'react';
import { TodosContext } from '../../Context/TodoContext';
import classNames from 'classnames';

export const TodoInput = () => {
  const { dispatch, state } = useContext(TodosContext);
  const [newTodo, setNewTodo] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const createNewTodo = () => {
    return {
      id: +new Date(),
      title: newTodo.trim(),
      completed: false,
    };
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleAdd = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setNewTodo('');

      return;
    }

    if (event.key === 'Enter' && newTodo.trim() !== '') {
      dispatch({ type: 'ADD_TODO', payload: createNewTodo() });
      setNewTodo('');
    }
  };

  const handleToggleAll = () => {
    dispatch({ type: 'TOGGLE_ALL', payload: state.todos });
  };

  const toggleAllClass = classNames('todoapp__toggle-all', {
    active: state.todos.every(todo => todo.completed),
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [state.todos]);

  return (
    <header className="todoapp__header">
      {state.todos.length !== 0 && (
        <button
          type="button"
          className={toggleAllClass}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      <form onSubmit={e => e.preventDefault()}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={handleChange}
          onKeyDown={handleAdd}
        />
      </form>
    </header>
  );
};
