import { useTodoContext } from '../context/TodoContext';
import { TodoItem } from '../TodoItem/TodoItem';

export const Todos = () => {
  const { filteredTodos } = useTodoContext();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
