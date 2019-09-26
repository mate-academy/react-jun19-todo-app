import React from 'react';

const TodosFilter = ({
  todos,
  filterIdentifier,
  toggleFilterIdentifier,
  removeCompletedTodos,
}) => (
  <>
    <ul className="filters">
      <li>
        <a
          href="#/"
          className={filterIdentifier === 'all' ? 'completed' : ''}
          //onClick={toggleFilterIdentifier('all')}
        >
          All
        </a>
      </li>
      <li>
        <a
          href="#/active"
          className={filterIdentifier === 'active' ? 'completed' : ''}
          //onClick={toggleFilterIdentifier('active')}
        >
          Active
        </a>
      </li>
      <li>
        <a
          href="#/completed"
          className={filterIdentifier === 'completed' ? 'completed' : ''}
          //onClick={toggleFilterIdentifier('completed')}
        >
          Completed
        </a>
      </li>
    </ul>
    {todos.filter(todo => todo.completed).length > 0 && (
      <button
        type="button"
        className="clear-completed"
        style={{ display: 'block' }}
        //onClick={removeCompletedTodos}
      >
        Clear completed
      </button>
    )}
  </>
);

export default TodosFilter;
