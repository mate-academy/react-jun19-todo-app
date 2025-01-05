import { FormEvent, useEffect, useRef, useState } from 'react';
import { getMaxId } from '../utils/methods';
import { Todo } from '../types/Todo';
import { useSetTodos, useTodos } from '../context/TodosContext';

export const NewTodoField: React.FC = () => {
  const todos = useTodos();
  const setTodos = useSetTodos();
  const [title, setTitle] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const input = inputRef.current;

    if (input) {
      input.focus();
    }
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newTodo: Todo = {
      id: getMaxId(todos) + 1,
      title: title.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={e => setTitle(e.target.value)}
        ref={inputRef}
      />
    </form>
  );
};
