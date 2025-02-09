import React from 'react';
import cn from 'classnames';
import { useTodos } from './TodosContext';

type Props = {
  query: string;
  setQuery: (query: string) => void;
  isAllCompleted: boolean;
  handleAllTodoCompleted: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
};

export const Header: React.FC<Props> = ({
  query,
  setQuery,
  isAllCompleted,
  handleAllTodoCompleted,
  inputRef,
}) => {
  const { todos, addTodo } = useTodos();

  const handleAddTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && query.trim() !== '') {
      addTodo(query.trim());
      setQuery('');
    }
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', { active: isAllCompleted })}
          data-cy="ToggleAllButton"
          onClick={handleAllTodoCompleted}
        />
      )}

      <form>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={event => setQuery(event.target.value)}
          onKeyDown={handleAddTodo}
        />
      </form>
    </header>
  );
};
