import { useContext } from 'react';
import { TodoInfo } from './TodoInfo';
import { TodosContext } from '../TodoContex';

export const TodoList = () => {
  const { filteredTodos } = useContext(TodosContext)!;

  return (
    <>
      {filteredTodos.map(todo => {
        return <TodoInfo todo={todo} key={todo.id} />;
      })}
    </>
  );
};
