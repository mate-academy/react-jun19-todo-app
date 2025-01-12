/* eslint-disable prettier/prettier */
import { Todo } from '../types/Todo';

/* eslint-disable import/extensions */
type Props = { todo: Todo };
export const TodoItem: React.FC<Props> = ({ todo }) => {
  return (
    <li>
      {' '}
      <div className="view">
        {' '}
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          // onChange={() => useLocalStorageToggleCompleted(todo)}
        />
        <label htmlFor="toggle-view">{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          // onClick={() => useLocalStorageRemoveTodo(todo)}
        />{' '}
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
