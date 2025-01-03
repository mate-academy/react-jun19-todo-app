import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import TodoItem from './TodoItem';

type TodoListTypes = {
  todosToShow: Todo[];
};

interface OnDblClickParams {
  index: number;
  todo: Todo;
}

const TodoList: React.FC<TodoListTypes> = ({ todosToShow }) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const onDblClick = ({ index, todo }: OnDblClickParams) => {
    setEditIndex(index);
    setEditValue(todo.title);
  };

  const onEscape = () => {
    setEditValue('');
    setEditIndex(null);
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todosToShow.map((todo, index) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            index={index}
            editIndex={editIndex}
            editValue={editValue}
            setEditValue={setEditValue}
            onDblClick={onDblClick}
            onEscape={onEscape}
          />
        );
      })}
    </section>
  );
};

export default TodoList;
