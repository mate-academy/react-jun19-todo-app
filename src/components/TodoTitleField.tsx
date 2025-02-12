import { useContext, useState } from 'react';
import { DispatchContext, StateContext } from '../Store';

export const TodoTitleField = () => {
  const dispatch = useContext(DispatchContext);
  const { editingTodo } = useContext(StateContext);
  const [title, setTitle] = useState(editingTodo?.title || '');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = () => {
    if (!editingTodo) {
      return;
    }

    if (title.trim() === '') {
      dispatch({ type: 'deleteTodo', payload: editingTodo.id });
    } else {
      dispatch({
        type: 'updateTodo',
        payload: { ...editingTodo, title: title.trim() },
      });
    }

    dispatch({ type: 'setEditingTodo', payload: null });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      dispatch({ type: 'setEditingTodo', payload: null });
    }
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <input
        data-cy="TodoTitleField"
        type="text"
        className="todo__title-field"
        placeholder="Empty todo will be deleted"
        value={title}
        onChange={handleTitleChange}
        onBlur={handleSubmit}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </form>
  );
};
