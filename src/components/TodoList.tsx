// import { useContext } from 'react';
// import { StateContext } from '../context/GlobalState';

export function TodoList() {
  // const { todos } = useContext(StateContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This todo is an active todo */}

      {/* {todos.map(todo => {
        return (
          <div data-cy="Todo" className="todo" key={todo.id}>
            <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>
            <span data-cy="TodoTitle" className="todo__title">
              {todo.title}
            </span>
            <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button>
          </div>
        );
      })} */}
    </section>
  );
}
