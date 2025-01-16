/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/quotes */
import { useContext } from 'react';
import './TodoApp.scss';

import { TodoItem } from './TodoItem';
import { FilteredTodoContext } from '../store/FilterdTodoContext';
// import { TodoContext } from '../store/TodoContext';
// type Props = { todos: Todo[] };
export const TodoList = () => {
  const { filteredTodos } = useContext(FilteredTodoContext);
  // const { todos, setTodos } = useContext(TodoContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
