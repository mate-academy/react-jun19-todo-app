import React from 'react';
import { Todo } from '../../types/Todo';
import TodoItem from '../TodoItem/TodoItem';

type TodoListProps = {
  todos: Todo[];
}


const TodoList: React.FC<TodoListProps> = React.memo(({ todos }) => {

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.length > 0 &&
        todos.map((todo: Todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        ))}
    </section>
  );
});

TodoList.displayName = 'TodoList';
export default TodoList;
