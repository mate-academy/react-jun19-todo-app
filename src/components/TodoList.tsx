import { useEffect, useState } from 'react';
import { useLocalStorageContext } from '../context/context';
import { TodoInfo } from './TodoInfo';

export const TodoList = () => {
  const { todos, filter } = useLocalStorageContext();

  const [todosToShow, setTodosToShow] = useState(todos);

  useEffect(() => {
    switch (filter) {
      case 'All':
        setTodosToShow(todos);
        break;
      case 'Active':
        setTodosToShow(todos.filter(todo => !todo.completed));
        break;
      case 'Completed':
        setTodosToShow(todos.filter(todo => todo.completed));
        break;
      default:
        setTodosToShow(todos);
    }
  }, [filter, todos]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todosToShow.map(todo => {
        return <TodoInfo todo={todo} key={todo.id} />;
      })}
    </section>
  );
};
