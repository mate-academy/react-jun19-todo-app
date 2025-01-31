import classNames from 'classnames';
import { useContext } from 'react';
import { TodosContext } from './TodosContext';
import { Form } from './Form';

export const Header: React.FC = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('useTodos must be used within a TodosProvider');
  }

  const { todos, updateTodo } = context;

  const toggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);
    const newStatus = !allCompleted;

    todos.forEach(todo => {
      updateTodo(todo.id, { completed: newStatus });
    });
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length !== 0 && (
        <button
          onClick={toggleAll}
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todos.every(el => el.completed),
          })}
          data-cy="ToggleAllButton"
        />
      )}

      {/* Add a todo on form submit */}
      <Form />
    </header>
  );
};
