import { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodoContext } from '../context/TodoContext';

export const TodoList: React.FC = () => {
  const { visibleTodos } = useContext(TodoContext)!;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
