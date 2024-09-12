import { PropsMain } from '../types';
import { TodoItem } from './Todo';
import React from 'react';

export const Main: React.FC<PropsMain> = ({ filteredTodos }) => {
  return (
    <section data-cy="TodoList" className="todoapp__main">
      {filteredTodos.map(item => (
        <TodoItem
          key={item.id}
          id={item.id}
          title={item.title}
          status={item.completed}
        />
      ))}
    </section>
  );
};
