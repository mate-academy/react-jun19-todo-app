import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from './ListItem';

export const TodoList = ({
  todos,
  deleteTodo,
  toggleComplited,
  handleCheckedAll,
}) => (
  <>
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      checked={todos.length
      && todos.every(todo => todo.completed)}
      onClick={handleCheckedAll}
    />
    <label htmlFor="toggle-all">Mark all as complete</label>
    {todos.length > 0 && (
      <ul className="todo-list">
        {todos.map(todo => (
          <ListItem
            key={todo.id}
            todo={todo}
            deleteTodo={() => deleteTodo(todo.id)}
            toggleComplited={() => toggleComplited(todo.id)}
          />
        ))}
      </ul>
    )}
  </>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleComplited: PropTypes.func.isRequired,
  handleCheckedAll: PropTypes.func.isRequired,
};
