import { useFilter } from '../context/FilterContext';
import { useTodos } from '../context/TodosContext';
import { Filter, FILTER_BY } from '../utils/constants/Filter';
// eslint-disable-next-line import/extensions
import { TodoElem } from './TodoElem';

export const TodoList = () => {
  const todos = useTodos();
  const currentFilter: Filter = useFilter();

  if (!todos) {
    return null;
  }

  const filteredTodos = todos.filter(todo => {
    switch (currentFilter) {
      case FILTER_BY.active:
        return !todo.completed;
      case FILTER_BY.completed:
        return todo.completed;
      default:
        return todo;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoElem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
