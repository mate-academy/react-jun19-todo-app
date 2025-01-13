import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { useTodoContext } from '../../context/TodoContext';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useTodoContext();

  const deleteTodo = (id: number) => {
    const filteredTodos = todos.filter(todo => todo.id !== id);

    setTodos(filteredTodos);
    localStorage.setItem('todos', JSON.stringify(filteredTodos));

    const inputField = document.querySelector(".todoapp__new-todo") as HTMLInputElement;
    inputField!.focus();
  }

  const toggleTodoStatus = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }

  return (
    <div data-cy="Todo" className={classNames("todo", {completed: todo.completed})}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => toggleTodoStatus(todo.id)}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      {/* Remove button appears only on hover */}
      <button type="button" className="todo__remove" data-cy="TodoDelete" onClick={() => deleteTodo(todo.id)}>
        ×
      </button>
    </div>
  )
}
