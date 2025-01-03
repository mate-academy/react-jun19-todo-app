import React, { useState } from 'react';
import cn from 'classnames';
import { useTodoContext } from '../Context/TodoProvider';

const Header: React.FC = () => {
  const { todoItems, addTodo, setTodoItems } = useTodoContext();
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');

  const addTodoFunc = (e: React.FormEvent<HTMLFormElement>, title: string) => {
    e.preventDefault();
    addTodo(title);
    setNewTodoTitle('');
  };

  const handleToggleAll = async () => {
    if (
      !todoItems.some(todo => todo.completed) ||
      !todoItems.some(todo => !todo.completed)
    ) {
      setTodoItems(
        todoItems.map(todo => ({
          ...todo,
          completed: !todo.completed,
        })),
      );

      return;
    } else {
      setTodoItems(
        todoItems.map(todo => ({
          ...todo,
          completed: true,
        })),
      );
    }
  };

  return (
    <header className="todoapp__header">
      {todoItems.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: todoItems.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={handleToggleAll}
        />
      )}

      <form onSubmit={e => addTodoFunc(e, newTodoTitle)}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={e => setNewTodoTitle(e.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};

export default Header;
