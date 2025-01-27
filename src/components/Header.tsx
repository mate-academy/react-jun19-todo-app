import classNames from 'classnames';
import { useContext } from 'react';
import { TodosContext } from '../TodoContex';

export const Header = () => {
  const {
    todos,
    handleToggleAllButton,
    handleSubmitButton,
    titleField,
    title,
    setTitle,
  } = useContext(TodosContext)!;

  return (
    <>
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: !todos.find(todo => !todo.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAllButton}
        />
      )}

      <form onSubmit={handleSubmitButton}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={titleField}
          value={title}
          onChange={event => {
            setTitle(event.target.value);
          }}
        />
      </form>
    </>
  );
};
