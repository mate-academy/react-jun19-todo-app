import cn from 'classnames';
import { useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext, StateContext } from '../Store';
import { Todo } from '../types/todo';

export const Header = () => {
  const { todos, editingTodo } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingTodo === null) {
      inputRef.current?.focus();
    }
  }, [editingTodo, todos]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: newTodoTitle.trim(),
      completed: false,
    };

    dispatch({ type: 'addNewTodo', payload: newTodo });
    setNewTodoTitle('');
  };

  const handleToggleAll = async () => {
    dispatch({ type: 'toggleAll' });
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: todos.length > 0 && todos.every(a => a.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          ref={inputRef}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={handleTitleChange}
          autoFocus
        />
      </form>
    </header>
  );
};
