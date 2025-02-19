import React, { useContext } from 'react';
import { Todo, TodoContext } from '../contexts/TodoContext';

type TodoItemProps = {
  item: Todo;
};

export const TodoItem = ({ item }: TodoItemProps) => {
  const { todos, setTodos, checked, setChecked } = useContext(TodoContext);

  const handleRemoveTodo = (id: number) => {
    const removeTodo = todos.filter((todo: Todo) => todo.id !== id);

    setTodos(removeTodo);
  };

  const handleChecked = (id: number) => {
    const findTodo = todos.find((todo: Todo) => todo.id === id);

    if (!findTodo) {
      return;
    }

    if (id === findTodo.id) {
      setChecked(!checked);
      Object.assign(findTodo, {
        completed: !findTodo.completed,
      });

      setTodos([...todos]);
    }
  };

  return (
    <>
      {/*
      eslint-disable-next-line jsx-a11y/label-has-associated-control
      */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className={`todo__status ${checked && 'completed'}`}
          checked={checked}
          onChange={() => handleChecked(item.id)}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {item.title}
      </span>

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => handleRemoveTodo(item.id)}
      >
        ×
      </button>
    </>
  );
};
