/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/quotes */
import { useContext } from 'react';
import './TodoApp.scss';

import { TodoItem } from './TodoItem';
import { FilteredTodoContext } from '../store/FilterdTodoContext';
// type Props = { todos: Todo[] };
export const TodoList = () => {
  const { filteredTodos } = useContext(FilteredTodoContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
