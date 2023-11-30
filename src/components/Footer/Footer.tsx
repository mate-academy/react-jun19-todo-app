import React from 'react';
import { TodoFilter } from '../TodoFilter';
import { Filter } from '../../types/Filter';

type Props = {
  todoCount: number;
  setFilter: (filter: Filter) => void;
  handlerClearCompleted: () => void;
  completedTodos: boolean;
  filter: Filter;
};

export const Footer: React.FC<Props> = ({
  todoCount,
  setFilter,
  handlerClearCompleted,
  completedTodos,
  filter,
}) => {
  const ONE_ELEMENT = 1;

  return (
    <footer className="footer" data-cy="todosFilter">
      <span className="todo-count" data-cy="todosCounter">
        {todoCount === ONE_ELEMENT
          ? `${todoCount} item left`
          : `${todoCount} items left`}
      </span>

      <TodoFilter
        filter={filter}
        setFilter={setFilter}
      />

      {completedTodos && (
        <button
          type="button"
          className="clear-completed"
          onClick={handlerClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
