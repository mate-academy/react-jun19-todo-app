import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export const Main = React.memo(
  ({
    todos,
    changeCheckBox,
    onDelete,
    onUpdateTitle,
    setAllTodosCompleted,
  }) => {
    const [todoIdForEdit, setTodoIdForEdit] = useState(0);
    const [renameTitle, setRename] = useState('');
    const [isChecked, setChecked] = useState(true);
    const [prevTodoTitle, setPrevTodo] = useState('');

    return (
      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          onClick={() => {
            setChecked(!isChecked);
            setAllTodosCompleted(isChecked);
          }}
        />
        {todos.length > 0 && (
          <label
            htmlFor="toggle-all"
          >
            Mark all as complete
          </label>
        )}

        <ul className="todo-list">

          {todos.map(todo => (

            <li
              className={classnames('',
                { completed: todo.completed },
                { editing: todoIdForEdit === todo.id })}
              key={todo.id}
              onDoubleClick={() => {
                setTodoIdForEdit(todo.id);
                setRename(todo.title);
                setPrevTodo(todo.title);
              }}
            >
              <div className="view">
                <input
                  type="checkbox"
                  className="toggle"
                  checked={todo.completed}
                  onClick={() => {
                    changeCheckBox(todo.id, !todo.completed);
                  }}
                />
                <label>{todo.title}</label>
                <button
                  type="button"
                  className="destroy"
                  onClick={() => {
                    onDelete(todo.id);
                  }}
                />
              </div>

              <input
                type="text"
                className="edit"
                value={renameTitle}
                onChange={(event) => {
                  setRename(event.target.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    onUpdateTitle(
                      todoIdForEdit,
                      event.target.value,
                      prevTodoTitle,
                    );
                    setTodoIdForEdit(null);
                  }

                  if (event.key === 'Escape') {
                    setTodoIdForEdit(null);
                  }
                }}
              />
            </li>
          ))}
        </ul>
      </section>
    );
  },
);

Main.propTypes = PropTypes.shape({
  data: PropTypes.arrayOf({
    id: PropTypes.number.isRequired,
    title: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
  }),
  changeCheckob: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdateTitle: PropTypes.func.isRequired,
}).isRequired;
