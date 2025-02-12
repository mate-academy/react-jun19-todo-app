import { useContext, useMemo } from 'react';
import { StateContext } from '../Store';
import { Filter } from '../types/Filter';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const { todos, filter } = useContext(StateContext);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case Filter.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case Filter.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
