import { useContext } from 'react';
import { StateContext } from '../context/GlobalState';
import { TodoItem } from './TodoItem';

export function TodoList() {
  const { filteredTodos } = useContext(StateContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This todo is an active todo */}

      {filteredTodos.map(todo => {
        return <TodoItem key={todo.id} todoItem={todo} />;
      })}
    </section>
  );
}
