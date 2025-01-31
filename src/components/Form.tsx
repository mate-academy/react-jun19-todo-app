import { useContext, useState } from 'react';
import { TodosContext } from './TodosContext';

export const Form = () => {
  const [title, setTitle] = useState('');
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('useTodos must be used within a TodosProvider');
  }

  const { addTodo, inputFocus } = context;

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (!title.trim()) {
          return;
        }

        addTodo({
          id: +new Date(),
          title: title.trim(),
          completed: false,
        });

        setTitle('');
      }}
    >
      <input
        autoFocus
        ref={inputFocus}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
    </form>
  );
};
