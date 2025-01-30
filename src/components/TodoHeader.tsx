import { useContext, useState, useMemo } from 'react';
import cn from 'classnames';
import { TodoContext } from '../context/TodoContext';

export const TodoHeader: React.FC = () => {
  const {
    todos,
    addTodo,
    completedTodos,
    toggleAllTodos,
    todoTitleRef,
    focusInput,
  } = useContext(TodoContext);
  const [todoTitle, setTodoTitle] = useState('');

  const isAllTodoCompleted = useMemo(() => {
    return completedTodos.length === todos.length;
  }, [completedTodos, todos]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = todoTitle.trim();

    if (!trimmedTitle) {
      setTodoTitle('');
      focusInput();

      return;
    }

    addTodo(trimmedTitle);
    setTodoTitle('');
  };

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', { active: isAllTodoCompleted })}
          data-cy="ToggleAllButton"
          onClick={toggleAllTodos}
        />
      )}

      <form onSubmit={onSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={todoTitleRef}
          value={todoTitle}
          onChange={event => setTodoTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
