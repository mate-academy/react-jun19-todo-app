import React, { useContext } from 'react';
import { TodoContext } from '../TodosContext';
import { TodosItem } from '../TodosItem';

export const TodosList: React.FC = () => {
  const {
    todo,
    setTodo,
    filterTodos,
    toggleAll,
    setToggleAll,
  } = useContext(TodoContext);

  const handleToggleAll = () => {
    if (toggleAll) {
      setTodo(currentTodo => currentTodo
        .map(todos => ({ ...todos, completed: false })));
    } else {
      setTodo(currentTodo => currentTodo
        .map(todos => ({ ...todos, completed: true })));
    }

    setToggleAll(!toggleAll);
  };

  return (
    <section className="main">
      {todo.length > 0 && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onChange={() => handleToggleAll()}
            checked={toggleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list" data-cy="todoList">
            {filterTodos().map(todos => (
              <TodosItem items={todos} key={todos.id} />
            ))}
          </ul>
        </>
      )}
    </section>
  );
};