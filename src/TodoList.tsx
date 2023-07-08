import React, { useContext } from 'react';
import { TodoCard } from './TodoCard';
import { Todo } from './types/Todo';
import { TodosContext } from './TodoContext';
import { updateTodos } from './api/todos';

type Props = {
  todos: Todo[],
  visibleTodos: Todo[],
  toggleAll: Todo[],
  untoggleAll: Todo[],
};

export const TodoList: React.FC<Props> = ({
  todos,
  visibleTodos,
  toggleAll,
  untoggleAll,
}) => {
  const { tempTodo, setTodos } = useContext(TodosContext);
  const { setIsUpdateError } = useContext(TodosContext);

  const updateAll = async () => {
    setIsUpdateError(false);

    try {
      if (todos.findIndex(todo => todo.completed === false) > -1) {
        await Promise.all(todos.map(todo => updateTodos(todo.id, true)));

        setTodos(toggleAll);
      } else {
        await Promise.all(todos.map(todo => updateTodos(todo.id, false)));

        setTodos(untoggleAll);
      }
    } catch {
      setIsUpdateError(true);
    }
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={() => updateAll()}
      />

      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul
        className="todo-list"
        data-cy="todoList"
      >
        {visibleTodos.map(todo => (
          <TodoCard
            todos={todos}
            currentTodo={todo}
            key={todo.id}
          />
        ))}

        {tempTodo !== null && tempTodo !== undefined && (
          <li>
            <div
              className="view"
              key={tempTodo.title}
            >
              <input
                type="checkbox"
                className="toggle"
                id="toggle-view"
              />
              <label>
                {tempTodo.title}
              </label>
              <button
                type="button"
                aria-label="delete"
                className="destroy"
                data-cy="deleteTodo"
              />
            </div>
          </li>
        )}
      </ul>
    </section>
  );
};
