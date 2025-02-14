import { Status } from '../types/statys';
import { Todo } from './TodoContext';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  filter: Status;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  filter,
  setTodos,
}) => {
  const hangleToggle = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleEdit = (id: number, title: string) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, title } : todo)),
    );
  };

  const handleDelete = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === Status.ACTIVE) {
      return !todo.completed;
    }

    if (filter === Status.COMPLETED) {
      return todo.completed;
    }

    return true;
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          hangleToggle={hangleToggle}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ))}
    </section>
  );
};
