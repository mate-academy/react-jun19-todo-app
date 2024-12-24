import React, { useContext, useState } from 'react';
import { TodosContext } from '../GlobalData/TodosDeveloper';
import classNames from 'classnames';
import { Todo as TodoInterface } from '../types/Todo';
import { EditTodo } from './EditTodo';

interface Props {
  todo: TodoInterface;
}

export const deleteTodo = (
  content: TodoInterface,
  setTodosList: React.Dispatch<React.SetStateAction<TodoInterface[]>>,
) => {
  setTodosList(currentTodo => {
    return currentTodo.filter(item => item.id !== content.id);
  });
};

export const Todo: React.FC<Props> = ({ todo }) => {
  const { setTodos } = useContext(TodosContext);
  const [editing, setEditing] = useState(false);

  const updateTodoStatus = (content: TodoInterface) => {
    setTodos(currentTodos =>
      currentTodos.map(item =>
        item.id === content.id
          ? { ...item, completed: !content.completed }
          : item,
      ),
    );
  };

  return (
    /* eslint-disable jsx-a11y/label-has-associated-control */
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
      key={todo.id}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onClick={() => {
            updateTodoStatus(todo);
          }}
        />
      </label>

      {editing && <EditTodo todo={todo} setEditing={setEditing} />}

      {!editing && (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              setEditing(true);
            }}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => {
              deleteTodo(todo, setTodos);
            }}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
