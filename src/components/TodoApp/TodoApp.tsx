import React, { useContext } from 'react';
import { TodoList } from '../TodoList/TodoList';
import { TodosContext } from '../../contexts/TodosContext';

export const TodoApp: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const handleCompleteAllTodo = () => {
    const notAllCompleted = todos.some(task => task.completed === false);

    if (notAllCompleted) {
      setTodos(prevTodos => prevTodos.map(
        (task) => ({ ...task, completed: true }),
      ));
    } else {
      setTodos(prevTodos => prevTodos.map(
        (task) => ({ ...task, completed: false }),
      ));
    }
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={handleCompleteAllTodo}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList />
    </section>
  );
};
