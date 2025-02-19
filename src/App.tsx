/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { Navitagion } from './components/Navigation';
import { TodoList } from './components/TodoList';
import { TodoContext } from './contexts/TodoContext';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const { title, todos, setTodos, setTitle, disabled } =
    useContext(TodoContext);

  const handleChangeAllStatus = () => {
    const changeAllStatus = todos.map((todo: Todo) =>
      Object.assign(todo, !todo.completed),
    );

    setTodos(changeAllStatus);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() === '') {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
  };

  const handleClearCompleted = () => {
    const clearCompleted = todos.filter(todo => !todo.completed);

    setTodos(clearCompleted);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className={`todoapp__toggle-all ${todos.find(todo => todo.completed === false) !== undefined && 'active'}`}
            data-cy="ToggleAllButton"
            onClick={handleChangeAllStatus}
          />

          {/* Add a todo on form submit */}
          <form onSubmit={e => handleSubmit(e)}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={e => {
                const value = e.target.value;

                setTitle(value);
                if (value === '') {
                  return;
                }
              }}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          <TodoList />

          {/* This todo is being edited */}
          <div data-cy="Todo" className="todo">
            {/*
            eslint-disable-next-line jsx-a11y/label-has-associated-control
            */}
            {/* <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label> */}

            {/* This form is shown instead of the title and remove button */}
            {/* <form>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                // value="Todo is being edited now"
              />
            </form> */}
          </div>

          {/* This todo is in loadind state */}
          {/* <div data-cy="Todo" className="todo"> */}
          {/*
            eslint-disable-next-line jsx-a11y/label-has-associated-control
            */}
          {/* <label className="todo__status-label">
              <input
                data-cy="TodoStatus"
                type="checkbox"
                className="todo__status"
              />
            </label>

            <span data-cy="TodoTitle" className="todo__title">
              Todo is being saved now
            </span> */}

          {/* <button type="button" className="todo__remove" data-cy="TodoDelete">
              ×
            </button> */}
          {/* </div> */}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => !todo.completed).length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <Navitagion />

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!disabled}
              onClick={handleClearCompleted}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};
