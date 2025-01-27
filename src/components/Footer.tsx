import classNames from 'classnames';
import { TodoType } from '../enums/TodoType';
import { useContext } from 'react';
import { TodosContext } from '../TodoContex';

export const Footer = () => {
  const {
    todos,
    completedTodosCount,
    clearCompletedTodo,
    todosType,
    setTodosType,
  } = useContext(TodosContext)!;

  return (
    <>
      <span className="todo-count" data-cy="TodosCounter">
        {todos.length - completedTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(TodoType).map(type => {
          return (
            <a
              href="#/"
              className={classNames('filter__link', {
                selected: todosType === type,
              })}
              data-cy={`FilterLink${type}`}
              key={type}
              onClick={() => setTodosType(type)}
            >
              {type}
            </a>
          );
        })}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={clearCompletedTodo}
        disabled={completedTodosCount === 0}
      >
        Clear completed
      </button>
    </>
  );
};
