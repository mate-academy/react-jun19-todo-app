import React, { FormEvent, useRef, useEffect } from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { useTodos } from '../context/TodoContext';

type Props = {
  addTodo: (event: FormEvent<HTMLFormElement>) => void;
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  changeTodoId: number | null;
  updateCompleted: (todoItem: Todo) => void;
};
export const Header: React.FC<Props> = ({
  addTodo,
  todo,
  setTodo,
  updateCompleted,
  changeTodoId,
}) => {
  const { todos } = useTodos();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const allCompleted = todos.every(tod => tod.completed);
  const toggleAllButton = () => {
    const incompleteTodos = todos.filter(tod => !tod.completed);

    const todosToUpdate = incompleteTodos.length > 0 ? incompleteTodos : todos;

    Promise.all(todosToUpdate.map(tod => updateCompleted(tod)));
  };

  useEffect(() => {
    if (!todo) {
      inputRef.current?.focus();
    }
  }, [todos, todo]);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={toggleAllButton}
        />
      )}

      <form onSubmit={addTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todo}
          onChange={e => setTodo(e.target.value)}
          disabled={changeTodoId !== null}
          ref={inputRef}
          autoFocus
        />
      </form>
    </header>
  );
};
