import React from 'react';
import { PropTypes } from 'prop-types';
import { TodoItem } from './TodoItem/TodoItem';
// import cn from 'classnames';

export const TodosList = (props) => {
  const {
    todos,
  } = props;

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </ul>
  );
};

TodosList.propTypes = {
  todos: PropTypes.arrayOf({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};
