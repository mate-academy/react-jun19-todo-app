import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { TodoContext } from '../store/TodoContext';
import { Todo } from '../types/Todo';

export const useTodoItem = (
  todo: Todo,
  setShowEditId: Dispatch<SetStateAction<number | null>>,
  showEditId: boolean,
) => {
  const [title, setTitle] = useState(todo.title);

  const { editTitle, setIsDeleted, handleDeleteTodo } = useContext(TodoContext);

  const handleSubmitEditedTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim().length) {
      handleDeleteTodo(todo);
      setIsDeleted(true);
    } else if (title.trim() === todo.title) {
      setShowEditId(null);
    } else if (showEditId && title.trim()) {
      editTitle(todo, title);
      setShowEditId(null);
    }
  };

  const handleEscape = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setTitle(todo.title);
      setShowEditId(null);
    }
  };

  return { handleEscape, handleSubmitEditedTodo, title, setTitle };
};
