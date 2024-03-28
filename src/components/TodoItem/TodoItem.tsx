import { useContext, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { DispatchContext, StateContext } from '../TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const { todos, editedTitle, isDoubleClicked } = useContext(StateContext);
  const inputActive = useRef<HTMLInputElement>(null);
  const currentTodo = todos.find(elem => elem.id === isDoubleClicked.id);

  const handleTodoChange = (handleTodo: Todo) => {
    const changeCompleted = todos.map(elem => {
      if (elem.id === handleTodo.id) {
        return {
          ...elem,
          completed: !handleTodo.completed,
        };
      }

      return elem;
    });

    dispatch({ type: 'setTodos', payload: changeCompleted });
  };

  const handleDoubleClick = (e: React.MouseEvent, id: number | null) => {
    if (e.detail === 2) {
      const payload = {
        state: !isDoubleClicked.state,
        id,
      };

      dispatch({ type: 'setIsDoubleClicked', payload });
    }
  };

  useEffect(() => {
    if (inputActive.current && currentTodo) {
      inputActive.current.focus();
    }
  }, [isDoubleClicked.id, todos, currentTodo]);

  const handleTodoDestroy = (handleTodo: Todo) => {
    dispatch({
      type: 'setTodos',
      payload: todos.filter(elem => elem.id !== handleTodo.id),
    });
  };

  const handleBlur = (
    e: React.ChangeEvent<HTMLInputElement>,
    handleTodo: Todo,
  ) => {
    const changedTitleOnBlur = todos.map(elem => {
      if (elem.id === handleTodo.id && e.target.value.length > 0) {
        return {
          ...elem,
          title: e.target.value,
        };
      }

      return elem;
    });

    dispatch({
      type: 'setIsDoubleClicked',
      payload: { state: false, id: null },
    });
    dispatch({ type: 'setTodos', payload: changedTitleOnBlur });
  };

  const handleSaveEditing = (e: React.KeyboardEvent, handleTodo: Todo) => {
    switch (e.key) {
      case 'Escape':
        dispatch({
          type: 'setIsDoubleClicked',
          payload: { state: false, id: null },
        });
        break;
      case 'Enter':
        if (editedTitle.length === 0) {
          handleTodoDestroy(handleTodo);

          return;
        }

        inputActive.current?.blur();
        break;
      default:
    }
  };

  return (
    <li
      className={classNames('view', {
        completed: todo.completed,
        editing: isDoubleClicked.id === todo.id,
      })}
    >
      <div
        className={classNames('view', {
          completed: todo.completed,
        })}
      >
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={() => handleTodoChange(todo)}
        />
        {/* eslint-disable-next-line */}
        <label onClick={e => handleDoubleClick(e, todo.id)}>{todo.title}</label>
        {/* eslint-disable-next-line */}
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleTodoDestroy(todo)}
        />
      </div>
      {isDoubleClicked.id === todo.id ? (
        <input
          defaultValue={currentTodo?.title}
          ref={inputActive}
          onBlur={e => handleBlur(e, todo)}
          type="text"
          className="edit"
          onKeyDown={e => handleSaveEditing(e, todo)}
          onChange={e =>
            dispatch({ type: 'setEditedTitle', payload: e.target.value })
          }
        />
      ) : (
        <input type="text" className="edit" />
      )}
    </li>
  );
};
