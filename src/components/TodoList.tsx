import { useEffect, useState } from 'react';
import { useLocalStorageContext } from '../context/context';
import { TodoInfo } from './TodoInfo';
import { FilterEnum } from '../types/Filter';

export const TodoList = () => {
  const { todos, filter } = useLocalStorageContext();

  const [todosToShow, setTodosToShow] = useState(todos);

  useEffect(() => {
    const filterActions = {
      [FilterEnum.All]: () => todos,
      [FilterEnum.Active]: () => todos.filter((todo) => !todo.completed),
      [FilterEnum.Completed]: () => todos.filter((todo) => todo.completed),
    };
  
    setTodosToShow(filterActions[filter] ? filterActions[filter]() : todos);
  }, [filter, todos]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todosToShow.map(todo => {
        return <TodoInfo todo={todo} key={todo.id} />;
      })}
    </section>
  );
};
