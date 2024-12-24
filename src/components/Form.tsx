import React, { useContext, useEffect, useRef } from 'react';

import { useForm } from '../hooks/useForm';
import { TodoContext } from '../store/TodoContext';

export const Form: React.FC = () => {
  const field = useRef<HTMLInputElement>(null);

  const { query, handleAddTodo, handleChangeQuery } = useForm();
  const { isDeleted } = useContext(TodoContext);

  useEffect(() => {
    if (!field.current) {
      return;
    }

    if (field.current || isDeleted) {
      field.current.focus();
    }
  }, [isDeleted]);

  return (
    <form onSubmit={handleAddTodo}>
      <input
        ref={field}
        value={query}
        onChange={handleChangeQuery}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
};
