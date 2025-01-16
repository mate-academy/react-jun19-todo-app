import { useState, useRef, useContext, useEffect } from 'react';
import { StateContext, DispatchContext } from '../../context/GlobalProvider';
import { Filters } from '../../types/Filters';

export const Form: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [currentTitle, setCurrentTitle] = useState<string>('');
  const newTodoDispatch = useContext(DispatchContext);
  const addToFilteredTodos = useContext(DispatchContext);
  const { todos } = useContext(StateContext);

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTitle = currentTitle.trim();

    if (trimmedTitle) {
      newTodoDispatch({ type: 'addTodo', payload: trimmedTitle });
      addToFilteredTodos({ type: 'filterTodos', payload: Filters.all });
      setCurrentTitle('');
      inputRef.current?.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        ref={inputRef}
        value={currentTitle}
        onChange={e => setCurrentTitle(e.target.value)}
      />
    </form>
  );
};
