import React, { useContext, useState } from 'react';

import { TodoContext } from '../store/TodoContext';
import { TodoItem } from './TodoItem';

const TodoList: React.FC = () => {
  const [showEditId, setShowEditId] = useState<number | null>(null);
  const { preparedTodos } = useContext(TodoContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      <>
        {preparedTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            showEditId={todo.id === showEditId}
            setShowEditId={setShowEditId}
          />
        ))}
      </>
    </section>
  );
};

export default React.memo(TodoList);
