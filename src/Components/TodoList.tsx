import React, { memo } from 'react';
import { Todo } from '../Types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

export const TodoList: React.FC<Props> = memo(({ todos, setTodos }) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {todos.map(item => (
        <li key={item.id}>
          <TodoItem
            todo={item}
            todos={todos}
            setTodos={setTodos}
          />
        </li>
      ))}
    </ul>
  );
});
