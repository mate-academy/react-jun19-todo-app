import { FormEvent, useState } from 'react';
import { useSetTodos, useTodos } from '../context/TodosContext';
import { Todo } from '../types/Todo';

interface Props {
  todo: Todo;
  onEditing: (v: boolean) => void;
}

export const TodoTitleField: React.FC<Props> = ({ todo, onEditing }) => {
  const { title, id } = todo;
  const todos = useTodos();
  const setTodos = useSetTodos();

  const [newTitle, setNewTitle] = useState(title);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedTitle = newTitle.trim();

    if (!trimmedTitle) {
      setTodos(todos.filter(v => v.id !== id));
    } else {
      setTodos([
        ...todos.map(v => (v.id === id ? { ...v, title: trimmedTitle } : v)),
      ]);
    }

    onEditing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="TodoTitleField"
        type="text"
        autoFocus
        className="todo__title-field"
        placeholder="Empty todo will be deleted"
        value={newTitle}
        onBlur={handleSubmit}
        onChange={e => setNewTitle(e.target.value)}
      />
    </form>
  );
};
