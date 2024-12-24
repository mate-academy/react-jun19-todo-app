import React, { useContext } from 'react';
import { TodosContext } from '../GlobalData/TodosDeveloper';
import { Filter } from '../types/Filter';
import classNames from 'classnames';
import { deleteTodo } from './Todo';

interface Props {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
}

export const Footer: React.FC<Props> = ({ filter, setFilter }) => {
  const { todos, setTodos } = useContext(TodosContext);

  const handleDeleteTodo = () => {
    todos.forEach(todo => {
      if (todo.completed) {
        deleteTodo(todo, setTodos);
      }
    });
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {(Object.values(Filter) as Filter[]).map(way => (
          <a
            key={way}
            href="#/"
            className={classNames('filter__link', { selected: filter === way })}
            data-cy={`FilterLink${way}`}
            onClick={() => {
              setFilter(way);
            }}
          >
            {way}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.every(todo => !todo.completed)}
        onClick={handleDeleteTodo}
      >
        Clear completed
      </button>
    </footer>
  );
};
