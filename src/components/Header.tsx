import { useContext, useState } from 'react';
import { DispatchContext } from '../context/TodosContext';

export const Header = () => {
  const dispatch = useContext(DispatchContext);
  const [title, setTitle] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (title.trim()) {
      dispatch({
        type: 'add',
        payload: title,
      });

      setTitle('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          value={title}
          placeholder="What needs to be done?"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          onBlur={handleSubmit}
        />
      </form>
    </header>
  );
};
