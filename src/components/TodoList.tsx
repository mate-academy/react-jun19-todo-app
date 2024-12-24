import React, { useContext, useMemo } from 'react';
import { Todo } from './Todo';
import { TodosContext } from '../GlobalData/TodosDeveloper';
import { Filter } from '../types/Filter';

interface Props {
  filter: Filter;
}

export const TodoList: React.FC<Props> = ({ filter }) => {
  const { todos } = useContext(TodosContext);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filter) {
        case Filter.All:
          return true;
        case Filter.Active:
          return !todo.completed;
        case Filter.Completed:
          return todo.completed;
        default:
          return true;
      }
    });
  }, [todos, filter]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
