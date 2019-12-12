import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import { TodoListProps } from '../PropTypes/PropTypes';

const TodoList = ({
  todosList,
  handleTodoStatus,
  handleDeleteTodo,
  handleDoubleClickEditTitle,
}) => (
  <ul className="todo-list">
    {todosList.length
      ? todosList
        .map(({ title, completed, id }) => (
          <TodoItem
            handleDoubleClickEditTitle={handleDoubleClickEditTitle}
            todoStatus={completed}
            todoTitle={title}
            handleTodoStatus={handleTodoStatus}
            handleDeleteTodo={handleDeleteTodo}
            key={id}
            todoId={id}
            todosList={todosList}
          />
        ))
      : null
    }
  </ul>
);

TodoList.propTypes = TodoListProps;

export default TodoList;
