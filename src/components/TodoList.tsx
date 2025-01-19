/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/quotes */

import { useContext } from 'react';
import { TodoContext } from '../store/TodoContext';

import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const { filteredTodos } = useContext(TodoContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
