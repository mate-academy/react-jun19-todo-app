import { TodoItem } from '../TodoItem/TodoItem';
import { useTodos } from '../../TodosContext';
import { filterTodos } from '../../services/Filtering';

export const TodoList = () => {
  const { todos, filter } = useTodos();

  const filteredTodos = filterTodos(todos, filter);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
        />
      ))}
    </section>
  );
};
