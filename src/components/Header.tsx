import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { DispatchContext, StateContext } from '../Provider';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

export const Header: React.FC = () => {
  const [title, setTitle] = useState('');
  const titleField = useRef<HTMLInputElement>(null);
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, [todos.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
    };

    dispatch({ type: 'addTodo', payload: newTodo });
    setTitle('');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const allTodosCompleted = useMemo(() => {
    return todos.filter(todo => todo.completed).length === todos.length;
  }, [todos]);

  const handleToggleAllButtonClick = () => {
    let todosToChange = [];

    if (allTodosCompleted) {
      todosToChange = [...todos];
    } else {
      todosToChange = todos.filter(todo => !todo.completed);
    }

    todosToChange.forEach(todo => {
      const { id, title: todoTitle, completed } = todo;

      dispatch({
        type: 'updateTodo',
        payload: { id, title: todoTitle, completed: !completed },
      });
    });
  };

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allTodosCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAllButtonClick}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          ref={titleField}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleTitleChange}
          autoFocus
        />
      </form>
    </header>
  );
};
