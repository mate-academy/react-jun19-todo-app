import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

import { editTodos, deleteTodos } from '../../api';

import { Context } from '../context';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = React.memo(({
  todo,
}) => {
  const {
    setTodos,
    loaderTodos,
    error,
  } = useContext(Context);

  const { id, title, completed } = todo;
  const [complitedTodo, setComplitedTodo] = useState(completed);
  const [todoLoader, setTodoLoader] = useState(false);
  const [deleteTodo, setDeleteTodo] = useState(false);

  useEffect(() => {
    setComplitedTodo(completed);
  }, [completed]);

  useEffect(() => {
    if (loaderTodos.includes(id)) {
      setTodoLoader(true);
    } else {
      setTodoLoader(false);
    }
  }, [loaderTodos]);

  const removeTodo = useCallback(() => {
    setTodoLoader(true);

    deleteTodos(id)
      .then(() => {
        setDeleteTodo(true);
        setTodos(todos => (
          [...todos.filter(todoItem => todoItem.id !== id),
          ]));
      })
      .catch(() => {
        setTodoLoader(false);
        error('Error, server not responding');
      });
  }, []);

  const toggleTodo = useCallback(() => {
    setTodoLoader(true);
    editTodos(id, {
      completed: !completed,
    })
      .then(() => {
        setTodoLoader(false);
        setComplitedTodo(!complitedTodo);
        setTodos(todos => [...todos.map(todoItem => (todoItem.id === id
          ? { ...todoItem, completed: !completed }
          : { ...todoItem }
        ))]);
      })
      .catch(() => {
        setTodoLoader(false);
        setComplitedTodo(complitedTodo);
        error('Error, server not responding');
      });
  }, [complitedTodo]);

  return (
    <>
      <div
        className={classNames(
          'view',
          { completed: complitedTodo },
        )}
        hidden={deleteTodo}
      >
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={complitedTodo}
          onChange={toggleTodo}
        />
        <label>{title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={removeTodo}
          aria-label="Delete todo"
        />

        <div
          data-cy="TodoLoader"
          className={classNames(
            { overlay: todoLoader },
          )}
        />
      </div>
      <input type="text" className="edit" />
    </>
  );
});
