import React, { useContext, useState } from 'react';
import { TodoContext } from '../store/TodoContext';
import { setLocaleStorageTodos } from '../utils/localStorageTodos';

export const useForm = () => {
  const [query, setQuery] = useState('');
  const { todos, handleAdd: handleAdd } = useContext(TodoContext);

  const trimmedQuery = query.trim();
  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleAddTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (trimmedQuery) {
      const newTodo = {
        title: trimmedQuery,
        completed: false,
        id: +new Date(),
      };

      const updatedTodos = [...todos, newTodo];

      handleAdd(updatedTodos);
      setLocaleStorageTodos(updatedTodos);
      setQuery('');
    }
  };

  return { query, handleChangeQuery, handleAddTodo };
};
