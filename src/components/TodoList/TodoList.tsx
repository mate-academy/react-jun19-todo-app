import { useContext } from 'react';

import { TodoItem } from '../TodoItem/TodoItem';

import { TodosContext } from '../../Contexts/TodosContext/TodosContext';
import { filterTodos } from '../Helpers/Helpers';

export const TodoList = () => {
  const { todos, status } = useContext(TodosContext);
  const filteredTodos = filterTodos(todos, status);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
