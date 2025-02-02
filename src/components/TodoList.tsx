import { useContext, useMemo } from 'react';
import { StateContext } from '../store/Store';
import { TodoItem } from './TodoItem';
import getTodosFilter from '../utils/getTodosFilter';

export const TodoList: React.FC = () => {
  const { todos, filterStatus } = useContext(StateContext);

  const fitredTodos = useMemo(() => {
    const todosFilter = getTodosFilter(filterStatus);

    return todosFilter(todos);
  }, [filterStatus, todos]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {fitredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
