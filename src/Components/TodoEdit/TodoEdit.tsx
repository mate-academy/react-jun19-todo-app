import { useContext, useState } from 'react';
import { TodosContext } from '../../Context/TodoContext';
import { EditContext } from '../../Context/EditContext';

type Props = {
  title: string;
  id: number;
};

export const TodoEdit: React.FC<Props> = ({ title, id }) => {
  const [newTodoTitle, setNewTodo] = useState(title);
  const { dispatch } = useContext(TodosContext);
  const { setEditedTodoId } = useContext(EditContext);

  const checkNewValue = (newTitle: string) => {
    if (newTitle.length === 0) {
      dispatch({ type: 'DELETE_TODO', payload: { id } });
      setEditedTodoId(null);

      return;
    }

    if (newTitle !== title) {
      dispatch({ type: 'RENAME_TODO', payload: { id, title: newTitle } });
    }

    setEditedTodoId(null);
  };

  const handleChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setEditedTodoId(null);

      return;
    }

    if (event.key !== 'Enter') {
      return;
    }

    checkNewValue(newTodoTitle.trim());
  };

  const handleBlur = () => {
    checkNewValue(newTodoTitle.trim());
  };

  return (
    <form onSubmit={e => e.preventDefault()}>
      <input
        autoFocus
        data-cy="TodoTitleField"
        type="text"
        className="todo__title-field"
        placeholder="Empty todo will be deleted"
        value={newTodoTitle}
        onBlur={handleBlur}
        onKeyDown={event => handleChange(event)}
        onChange={event => setNewTodo(event.target.value)}
      />
    </form>
  );
};
