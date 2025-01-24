import { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { StateContext } from '../Provider';
import { Filter } from '../types/Filter';

export const TodoList: React.FC = () => {
  const { todos, filter } = useContext(StateContext);

  const filteredTodos = todos.filter(todo => {
    if (filter === Filter.Completed) {
      return todo.completed;
    } else if (filter === Filter.Active) {
      return !todo.completed;
    }

    return true;
  });

  if (!filteredTodos.length) {
    return null;
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
