import React from 'react';
import PropTypes from 'prop-types';
import CN from 'classnames';

export const TodoList = (
  { visibleTodos,
    deleteTodo,
    completedTodo,
    handleSubmit,
    changeTitle,
    newValue,
    editingTodo,
    showChangeTitle,
    handleChangeTitle,
    handleCompletedAll,
    cancelEditing },
) => (
  <section className="main">
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      checked={visibleTodos.length > 0
      && visibleTodos.every(todo => todo.completed)}
      onChange={handleCompletedAll}
    />
    <label htmlFor="toggle-all">Mark all as complete</label>
    <ul className="todo-list">
      {visibleTodos.map(({ id, title, completed }) => (
        <li
          onDoubleClick={() => changeTitle(id)}
          key={id}
          className={CN({
            editing: editingTodo === id,
            completed: editingTodo !== id && completed,
            '': editingTodo !== id && !completed,
          })}
        >
          <div className="view">
            <input
              type="checkbox"
              checked={completed}
              className="toggle"
              id={`todo-${id}`}
              onClick={() => completedTodo(id)}
            />
            <label htmlFor={`todo-${id}`}>
              {title}
            </label>
            <button
              type="button"
              className="destroy"
              onClick={() => deleteTodo(id)}
            />
          </div>
          {showChangeTitle && (
            <form onSubmit={() => handleSubmit(id)}>
              <input
                id={id}
                value={newValue}
                onChange={handleChangeTitle}
                type="text"
                className="edit"
                onBlur={event => cancelEditing(event)}
                onKeyDown={event => cancelEditing(event)}
              />
            </form>
          )}
        </li>
      ))}
    </ul>
  </section>
);

TodoList.propTypes = {
  deleteTodo: PropTypes.func.isRequired,
  completedTodo: PropTypes.func.isRequired,
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })),
  handleSubmit: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
  newValue: PropTypes.string.isRequired,
  editingTodo: PropTypes.number,
  showChangeTitle: PropTypes.bool.isRequired,
  handleChangeTitle: PropTypes.func.isRequired,
  handleCompletedAll: PropTypes.func.isRequired,
  cancelEditing: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  visibleTodos: [],
  editingTodo: null,
};
