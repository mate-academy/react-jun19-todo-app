import React from 'react';

import { FilterType } from '../types/FilterType';
import { Filter } from './Filter';
import { useTodos } from './TodosContext';

type Props = {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
};

export const Footer: React.FC<Props> = ({ filter, setFilter }) => {
  const { todos, setTodos } = useTodos();

  const numberOfActiveTodos = todos.filter(todo => !todo.completed).length;

  const handleDeleteCompletedTodos = () => {
    const unCompletedTodos = todos.filter(todo => !todo.completed);

    setTodos(unCompletedTodos);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {numberOfActiveTodos} items left
      </span>

      <Filter filter={filter} setFilter={setFilter} />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!todos.some(todo => todo.completed)}
        onClick={handleDeleteCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
