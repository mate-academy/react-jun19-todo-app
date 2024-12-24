import React, { useContext, useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { InputsFocusContext, TodosContext } from '../GlobalData/TodosDeveloper';
import classNames from 'classnames';

const creativeTodo = (content: string): Todo => {
  return {
    id: +new Date(),
    title: content.trim(),
    completed: false,
  };
};

const checkTheSameTodo = (content: Todo[], currentTodo: Todo) => {
  return content.some(todo => todo.title === currentTodo.title);
};

export const Header: React.FC = () => {
  const [value, setValue] = useState('');

  const { todos, setTodos } = useContext(TodosContext);

  const inputRefs = useContext(InputsFocusContext);

  useEffect(() => {
    if (inputRefs?.inputRef1?.current) {
      inputRefs?.inputRef1?.current.focus();
    }
  }, [inputRefs]);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value.trim().length > 0) {
      const newTodo = creativeTodo(value);

      if (checkTheSameTodo(todos, newTodo)) {
        alert('Tак це ж вже було');
      }

      if (!checkTheSameTodo(todos, newTodo)) {
        setTodos((currentTodos: Todo[]) => [...currentTodos, newTodo]);
        setValue('');
      }
    } else {
      return;
    }
  };

  const handleUpdateTodoStatus = () => {
    if (todos.every(todo => todo.completed)) {
      setTodos(currentTodos =>
        currentTodos.map(item => ({ ...item, completed: false })),
      );
    } else {
      setTodos(currentTodos =>
        currentTodos.map(item =>
          item.completed !== true ? { ...item, completed: true } : item,
        ),
      );
    }
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={handleUpdateTodoStatus}
        />
      )}

      <form onSubmit={handleOnSubmit}>
        <input
          ref={inputRefs && inputRefs.inputRef1}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={e => {
            setValue(e.target.value);
          }}
        />
      </form>
    </header>
  );
};
