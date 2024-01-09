/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import TodoList from './components/TodoList';
import { DispatchContext, TodosContext } from './store/Store';
import TodosFilter from './components/TodosFilter';
import { Status } from './type/Status';
import getFilterTodos from './helpers/getFilterTodos';

export const App: React.FC = () => {
  const { todos } = useContext(TodosContext);
  const dispatch = useContext(DispatchContext);

  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleCheckboxChangeAll = () => {
    dispatch({ type: 'setToggleAll' });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!inputValue.trim()) {
      return;
    }

    if (event.key === 'Enter') {
      dispatch({ type: 'addTodo', payload: inputValue });
      setInputValue('');
    }
  };

  const handleOnClickDeleteAllCompleted = () => {
    dispatch({ type: 'deleteAllCompleted' });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const [currentUrl, setCurrentUrl] = useState(window.location.hash);

  useEffect(() => {
    const handlePathChange = () => {
      setCurrentUrl(window.location.hash);
    };

    window.addEventListener('popstate', handlePathChange);

    return () => {
      window.removeEventListener('popstate', handlePathChange);
    };
  }, []);

  const filteredTodos = useMemo(
    () => getFilterTodos(currentUrl as Status, todos),
    [currentUrl, todos],
  );

  const activeTodos = useMemo(
    () => getFilterTodos(Status.active, todos), [todos],
  );

  const completedTodos = useMemo(
    () => getFilterTodos(Status.completed, todos), [todos],
  );

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={inputValue}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          checked={todos.every(item => item.completed)}
          onChange={handleCheckboxChangeAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList items={filteredTodos} />
      </section>

      {!!todos.length && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {activeTodos.length}
            items left
          </span>

          <TodosFilter currentUrl={currentUrl} />

          {completedTodos.length > 0 && (
            <button
              type="button"
              className="clear-completed"
              onClick={handleOnClickDeleteAllCompleted}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
};
