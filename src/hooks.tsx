import { useEffect, useRef, useState } from 'react';
import { Todo } from './types/Todo';

export const useLocalStorage = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const savedValue = localStorage.getItem('todos');

      return savedValue ? JSON.parse(savedValue) : [];
    } catch (error) {
      return [];
    }
  });
  const [loadList, setLoadList] = useState<number[]>([]);
  const inputFocus = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const updateTodo = async (todoId: number, updateData: Partial<Todo>) => {
    try {
      setLoadList(current => [...current, todoId]);

      await setTodos(currentTodos => {
        const updatedTodos = currentTodos.map(todo =>
          todo.id === todoId ? { ...todo, ...updateData } : todo,
        );

        return updatedTodos;
      });
    } catch {
      setLoadList(current => current.filter(el => el !== todoId));

      return;
    } finally {
      setLoadList(current => current.filter(el => el !== todoId));
    }
  };

  const deleteTodo = (id: number | Date) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  };

  return {
    todos,
    setTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    loadList,
    inputFocus,
  };
};
