import React, { useContext } from 'react';
import { Status } from '../types/statys';
import { TodoItem } from './TodoItem';
import { TodoContext } from './TodoContext';

interface TodoListProps {
  filter: Status;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const TodoList: React.FC<TodoListProps> = ({ filter, inputRef }) => {
  const todoContext = useContext(TodoContext);

  if (!todoContext) {
    return null;
  }

  const { todos, handleToggle, handleDelete, handleEdit } = todoContext;

  const filteredTodos = todos.filter(todo => {
    if (filter === Status.ACTIVE) {
      return !todo.completed;
    }

    if (filter === Status.COMPLETED) {
      return todo.completed;
    }

    return true;
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem
          inputRef={inputRef}
          key={todo.id}
          todo={todo}
          handleToggle={handleToggle}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ))}
    </section>
  );
};
