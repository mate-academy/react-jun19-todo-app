import { useTodoContext } from "../../context/TodoContext"
import { TodoItem } from "../TodoItem/TodoItem"


enum FilterT {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const TodoList: React.FC = () => {
  const { todos, filter } = useTodoContext();

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case FilterT.Active:
        return !todo.completed;
      case FilterT.Completed:
        return todo.completed;
      case FilterT.All:
      default:
        return true;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo}/>
      ))}
    </section>
  )
}
