import React, { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { Todo } from '../types/Todo';

type TodoItemProps = {
  item: Todo;
};

export const TodoItem = ({ item }: TodoItemProps) => {
  const { todos, setTodos } = useContext(TodoContext);

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
      Object.assign(findTodo, {
        completed: !findTodo.completed,
      });

      setTodos([...todos]);
    }
  };

  // console.log(item.completed);

  return (
    <>
      {/*
      eslint-disable-next-line jsx-a11y/label-has-associated-control
      */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className={`todo__status ${item.completed && 'completed'}`}
          checked={item.completed}
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
