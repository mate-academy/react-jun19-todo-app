/* eslint-disable object-curly-newline */ /* eslint-disable @typescript-eslint/quotes */ /* eslint-disable jsx-a11y/control-has-associated-label */
import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import './styles/todoapp.scss';
import { Todo } from './types/Todo';
import { TodoContext } from './store/TodoContext';
import { TodoList } from './components/TodoList';
export const App: React.FC = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const [title, setTitle] = useState('');

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function addTodo(newTodo: Todo) {
    setTodos([...todos, newTodo]);
  }

  function onFormSubmit(event: FormEvent) {
    event.preventDefault();
    const newTodo: Todo = { id: +new Date(), title, completed: false };

    addTodo(newTodo);
  }

  return (
    <div className="todoapp">
      {' '}
      <header className="header">
        <h1> todos {title} </h1>
        <form onSubmit={onFormSubmit}>
          {' '}
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={handleTitleChange}
          />{' '}
        </form>{' '}
      </header>
      <TodoList todos={todos} />
      <section className="main">
        {' '}
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
        />
        <label htmlFor="toggle-all">Mark all as complete</label>   {' '}
      </section>
      <footer className="footer">
        {' '}
        <span className="todo-count" data-cy="todosCounter">
                      3 items left         {' '}
        </span>
        <ul className="filters">
          {' '}
          <li>
            {' '}
            <a href="#/" className="selected">
                              All             {' '}
            </a>{' '}
          </li>
          <li>
            <a href="#/active">Active</a>           {' '}
          </li>
          <li>
            <a href="#/completed">Completed</a>           {' '}
          </li>{' '}
        </ul>
        <button type="button" className="clear-completed">
                      Clear completed         {' '}
        </button>{' '}
      </footer>{' '}
    </div>
  );
};

// /* eslint-disable jsx-a11y/control-has-associated-label */
// import React from 'react';

// import './styles/todoapp.scss';

// export const App: React.FC = () => {
//   return (
//     <div className="todoapp">
//       <h1 className="todoapp__title">todos</h1>

//       <div className="todoapp__content">
//         <header className="todoapp__header">
//           {/* this button should have `active` class only if all todos are completed */}
//           <button
//             type="button"
//             className="todoapp__toggle-all active"
//             data-cy="ToggleAllButton"
//           />

//           {/* Add a todo on form submit */}
//           <form>
//             <input
//               data-cy="NewTodoField"
//               type="text"
//               className="todoapp__new-todo"
//               placeholder="What needs to be done?"
//             />
//           </form>
//         </header>

//         <section className="todoapp__main" data-cy="TodoList">
//           {/* This is a completed todo */}
//           <div data-cy="Todo" className="todo completed">
//             <label className="todo__status-label">
//               <input
//                 data-cy="TodoStatus"
//                 type="checkbox"
//                 className="todo__status"
//                 checked
//               />
//             </label>

//             <span data-cy="TodoTitle" className="todo__title">
//               Completed Todo
//             </span>

//             {/* Remove button appears only on hover */}
//             <button type="button" className="todo__remove" data-cy="TodoDelete">
//               ×
//             </button>
//           </div>

//           {/* This todo is an active todo */}
//           <div data-cy="Todo" className="todo">
//             <label className="todo__status-label">
//               <input
//                 data-cy="TodoStatus"
//                 type="checkbox"
//                 className="todo__status"
//               />
//             </label>

//             <span data-cy="TodoTitle" className="todo__title">
//               Not Completed Todo
//             </span>

//             <button type="button" className="todo__remove" data-cy="TodoDelete">
//               ×
//             </button>
//           </div>

//           {/* This todo is being edited */}
//           <div data-cy="Todo" className="todo">
//             <label className="todo__status-label">
//               <input
//                 data-cy="TodoStatus"
//                 type="checkbox"
//                 className="todo__status"
//               />
//             </label>

//             {/* This form is shown instead of the title and remove button */}
//             <form>
//               <input
//                 data-cy="TodoTitleField"
//                 type="text"
//                 className="todo__title-field"
//                 placeholder="Empty todo will be deleted"
//                 value="Todo is being edited now"
//               />
//             </form>
//           </div>

//           {/* This todo is in loadind state */}
//           <div data-cy="Todo" className="todo">
//             <label className="todo__status-label">
//               <input
//                 data-cy="TodoStatus"
//                 type="checkbox"
//                 className="todo__status"
//               />
//             </label>

//             <span data-cy="TodoTitle" className="todo__title">
//               Todo is being saved now
//             </span>

//             <button type="button" className="todo__remove" data-cy="TodoDelete">
//               ×
//             </button>
//           </div>
//         </section>

//         {/* Hide the footer if there are no todos */}
//         <footer className="todoapp__footer" data-cy="Footer">
//           <span className="todo-count" data-cy="TodosCounter">
//             3 items left
//           </span>

//           {/* Active link should have the 'selected' class */}
//           <nav className="filter" data-cy="Filter">
//             <a
//               href="#/"
//               className="filter__link selected"
//               data-cy="FilterLinkAll"
//             >
//               All
//             </a>

//             <a
//               href="#/active"
//               className="filter__link"
//               data-cy="FilterLinkActive"
//             >
//               Active
//             </a>

//             <a
//               href="#/completed"
//               className="filter__link"
//               data-cy="FilterLinkCompleted"
//             >
//               Completed
//             </a>
//           </nav>

//           {/* this button should be disabled if there are no completed todos */}
//           <button
//             type="button"
//             className="todoapp__clear-completed"
//             data-cy="ClearCompletedButton"
//           >
//             Clear completed
//           </button>
//         </footer>
//       </div>
//     </div>
//   );
// };
