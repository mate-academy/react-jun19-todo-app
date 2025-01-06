import cl from 'classnames';
import { useSetTodos, useTodos } from '../context/TodosContext';
import { getCompletedTodos } from '../utils/methods';
import { NewTodoField } from './NewTodoField';

export const Header = () => {
  const todos = useTodos();
  const setTodos = useSetTodos();

  const isEqual = getCompletedTodos(todos).length === todos.length;

  const handleToggleAll = () => {
    const shouldChangeAll = isEqual || getCompletedTodos(todos).length === 0;

    setTodos(
      todos.map(e => ({
        ...e,
        completed: shouldChangeAll ? !e.completed : true,
      })),
    );
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className={cl('todoapp__toggle-all', {
            active: isEqual,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      {/* Add a todo on form submit */}
      <NewTodoField />
    </header>
  );
};
