import { useContext, useEffect, useState } from 'react';
import { TodosContext } from '../../Context/TodoContext';
import { TodoElement } from '../TodoElement';
import { EditProvider } from '../../Context/EditContext';

export const TodoList = () => {
  const { state } = useContext(TodosContext);
  const { todos, filter } = state;
  const [visibleTodos, setVisibleTodos] = useState(todos);

  useEffect(() => {
    if (filter === 'ALL') {
      setVisibleTodos(todos);
    } else if (filter === 'COMPLETED') {
      setVisibleTodos(todos.filter(todo => todo.completed));
    } else {
      setVisibleTodos(todos.filter(todo => !todo.completed));
    }
  }, [filter, todos]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.length !== 0 && (
        <EditProvider>
          {visibleTodos.map(todo => (
            <TodoElement key={todo.id} todo={todo} />
          ))}
        </EditProvider>
      )}
    </section>
  );
};
