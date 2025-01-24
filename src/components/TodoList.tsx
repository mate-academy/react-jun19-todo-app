import { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const { preparedTodos } = useContext(TodoContext)!;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {preparedTodos?.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </section>
  );
};
