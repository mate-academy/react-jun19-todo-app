import { useSetTodos, useTodos } from '../context/TodosContext';
import { getCompletedTodos } from '../utils/methods';
import { Filter } from './Filter';

export const Footer = () => {
  const todos = useTodos();
  const setTodos = useSetTodos();

  if (todos.length === 0) {
    return null;
  }

  const handleClearCompleted = () => {
    setTodos([...todos].filter(e => !e.completed));
  };

  const getItemsLeft = todos.length - getCompletedTodos(todos).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {getItemsLeft} items left
      </span>

      <Filter />

      {/* this button should be disabled if there are no completed todos */}

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={getCompletedTodos(todos).length === 0}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
