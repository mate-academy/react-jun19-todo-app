// import { useContext, useState } from 'react';
// import { DispatchContext } from '../context/GlobalState';
// import { Todo } from '../types/Todo';

export function Header() {
  // const [query, setQuery] = useState<string>('');
  // const { dispatch } = useContext(DispatchContext);

  // Ensure dispatch is not null

  function handleCreateTodo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // const todo: Todo = {
    //   id: +new Date(),
    //   title: query.trim(),
    //   completed: false,
    // };

    // dispatch({ type: 'create', payload: todo });
    // setQuery('');
  }

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleCreateTodo}>
        <input
          data-cy="NewTodoField"
          type="text"
          // value={query}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          // onChange={e => {
          //   setQuery(e.target.value);
          // }}
        />
      </form>
    </header>
  );
}
