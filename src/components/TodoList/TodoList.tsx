import { useContext } from 'react';
import { DispatchContext, StateContext } from '../../context/GlobalProvider';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const { filteredTodos } = useContext(StateContext);
  const deleteTodo = useContext(DispatchContext);

  const handleDeleteTodo = (id: number) => {
    deleteTodo({ type: 'deleteTodo', payload: id });
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onDelete={handleDeleteTodo} />
      ))}
    </section>
  );
};
