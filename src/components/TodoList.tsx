import { useTodoContext } from "../context/TodoContext"
import { TodoItem } from "./TodoItem"

export const TodoList: React.FC = () => {
  const { todos } = useTodoContext();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo}/>
      ))}
    </section>
  )
}
