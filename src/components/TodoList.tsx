import { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { StateContext } from '../context/TodosContext';
import { FilterType } from '../types/FilterType';

export const TodoList = () => {
  const { todos, filterBy } = useContext(StateContext);

  const filterTodos = () => {
    switch (filterBy) {
      case FilterType.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case FilterType.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  return (
    <ul className="todo-list" data-cy="todosList">
      {filterTodos().map(todo => (<TodoItem todo={todo} key={todo.id} />))}
    </ul>
  );
};
