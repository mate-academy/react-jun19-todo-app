import { TodoInfo } from './TodoInfo';
import { useTodo } from '../TodoContex';

export const TodoList = () => {
  const { filteredTodos } = useTodo()!;

  return (
    <>
      {filteredTodos.map(todo => {
        return <TodoInfo todo={todo} key={todo.id} />;
      })}
    </>
  );
};
