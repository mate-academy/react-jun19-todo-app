import { useContext } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { StateContext } from '../../GlobalProvider/GlobalProvider';

export const TodoList = () => {
  const todos = useContext(StateContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
