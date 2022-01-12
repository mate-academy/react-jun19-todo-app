import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem';

export function TodoList({
  todos,
  changeStatus,
  deleteTodo,
  updateTodoItem,
}) {
  const [editingTodoId, setEditingTodoId] = useState(0);

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          changeStatus={changeStatus}
          key={todo.id}
          deleteTodo={deleteTodo}
          updateTodoItem={updateTodoItem}
          editingTodoId={editingTodoId}
          setEditingTodoId={setEditingTodoId}
        />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  changeStatus: PropTypes.func.isRequired,
  updateTodoItem: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isReuired,
      title: PropTypes.string.isReuired,
      completed: PropTypes.bool.isReuired,
    }).isRequired,
  ).isRequired,
};
