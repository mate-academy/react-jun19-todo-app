import { useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  visibleTodos: Todo[];
};

export const Main: React.FC<Props> = ({ visibleTodos }) => {
  const [editingTodo, setEditingTodo] = useState<Date | number | null>(null);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos?.map(todo => (
        <TodoItem
          key={`${todo.id}-${todo.completed}`}
          todo={todo}
          editing={editingTodo}
          onEdit={setEditingTodo}
        />
      ))}
    </section>
  );
};
