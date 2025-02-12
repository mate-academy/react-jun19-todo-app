import React from 'react';
import { Todo } from '../types/Todo';
import { FilterType } from '../types/FilterType';

import { TodoItem } from './TodoItem';
import { useTodos } from '../context/TodoContext';

type Props = {
  filter: FilterType;
  updateCompleted: (todoItem: Todo) => void;
  changeTodoId: number | null;
  newTitle: string;
  setNewTitle: (e: string) => void;
  handleKeyUp: (
    e: React.KeyboardEvent<HTMLInputElement>,
    todoItem: Todo,
  ) => void;
  handleDoubleClick: (todoItem: Todo) => void;
  handleBlur: (todoItem: Todo) => void;
  deleteTodoHandler: (todoId: number) => void;
};
export const TodoList: React.FC<Props> = ({
  filter,
  updateCompleted,
  changeTodoId,
  newTitle,
  setNewTitle,
  handleKeyUp,
  handleDoubleClick,
  handleBlur,
  deleteTodoHandler,
}) => {
  const { todos } = useTodos();
  const todoFilter = todos.filter(tod => {
    if (filter === FilterType.Active) {
      return !tod.completed;
    }

    if (filter === FilterType.Completed) {
      return tod.completed;
    }

    return true;
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todoFilter.map(todoItem => (
        <TodoItem
          key={todoItem.id}
          todoItem={todoItem}
          updateCompleted={updateCompleted}
          changeTodoId={changeTodoId}
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          handleDoubleClick={handleDoubleClick}
          handleKeyUp={handleKeyUp}
          handleBlur={handleBlur}
          deleteTodoHandler={deleteTodoHandler}
        />
      ))}
    </section>
  );
};
