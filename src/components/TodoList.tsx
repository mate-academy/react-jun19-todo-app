import { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodoContext } from '../context/TodoContext';

// interface TodoListProps {
//   todos: Todo[];
//   handleDeleteTodo: (todoId: number) => void;
//   handleUpdateTodo: (updatedTodo: Todo) => void;
// }

export const TodoList: React.FC = () => {
  const { visibleTodos } = useContext(TodoContext)!;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            // handleDeleteTodo={handleDeleteTodo}
            // handleUpdateTodo={handleUpdateTodo}
          />
        );
      })}
    </section>
  );
};
