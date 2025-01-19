import { useContext, useMemo } from 'react';

import { StateContext } from '../../Store';

import { TodoItem } from '../TodoItem/TodoItem';
import { Filter } from '../../types/Filter';

export const TodoList = () => {
  const { todos, filter } = useContext(StateContext);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case Filter.all:
        return todos;

      case Filter.active:
        return todos.filter(todo => !todo.completed);

      case Filter.completed:
        return todos.filter(todo => todo.completed);
    }
  }, [filter, todos]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
