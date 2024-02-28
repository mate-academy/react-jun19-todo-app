import { useContext } from 'react';
import { TodosContext } from '../Contexts/TodosContext';
import { TodoItem } from './TodoItem';
import { Status } from '../Types/Status';

export const TodoList: React.FC = () => {
  const { todos, query } = useContext(TodosContext);

  const filteredTodos = todos.filter(todo => {
    switch (query) {
      case Status.Active:
        return todo.completed !== true;
      case Status.Completed:
        return todo.completed === true;
      default:
        return true;
    }
  });

  return (
    <ul
      className="todo-list"
      data-cy="todosList"
    >
      {filteredTodos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
