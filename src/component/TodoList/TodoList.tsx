import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { useTodo } from '../../context/TodoProvider';

export const TodoList: React.FC = () => {
  const { filteredTodos } = useTodo();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
