import { useContext, useMemo } from 'react';
import { StateContext } from '../GlobalProvider';
import { TodoItem } from './TodoItem';
import { filterTodos } from '../utils/FilterTodos';

/* eslint-disable jsx-a11y/label-has-associated-control */
export const TodoList = () => {
  const { todos, filter } = useContext(StateContext);

  const visibleTodos = useMemo(
    () => filterTodos(todos, filter),
    [filter, todos],
  );

  if (!todos.length) {
    return null;
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
