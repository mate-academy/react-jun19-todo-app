import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = () => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TodoItem />
    </section>
  );
};
