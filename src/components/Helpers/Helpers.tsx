import { useCallback, useState } from 'react';

import { Todo } from '../../types/Todo';
import { TodoStatus } from '../../types/Status';
import { ManageTodos } from '../../types/ManageTodos';
import { ReturnValue } from '../../types/useLocalStorage';

export const filterTodos = (todos: Todo[], status: TodoStatus) => {
  const todosCopy = [...todos];

  switch (status) {
    case TodoStatus.active:
      return todosCopy.filter(todo => !todo.completed);
    case TodoStatus.completed:
      return todosCopy.filter(todo => todo.completed);
    case TodoStatus.all:
      return todosCopy;
  }
};

export const capitalizeFirstLetter = (value: TodoStatus) => {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
};

export const filterOptions = Object.values(TodoStatus);

export const useLocalStorage = (key: string): ReturnValue => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const getLocalStorageData = useCallback(() => {
    try {
      const localStorageData = localStorage.getItem(key);

      if (localStorageData) {
        setTodos(JSON.parse(localStorageData));
      }
    } catch {
      setTodos([]);
      throw new Error('Unable to load todos from local storage');
    }
  }, [key]);

  const saveTodosToLocalStorage = (todosData: Todo[]) => {
    localStorage.setItem(key, JSON.stringify(todosData));
  };

  const manageLocalStorage = ({
    action,
    id,
    newItem,
    newTitle,
  }: ManageTodos) => {
    let updatedTodos = [...todos];

    switch (action) {
      case 'add':
        if (!newItem) {
          throw new Error("New item must be provided for 'add' action.");
        }

        updatedTodos.push(newItem);
        break;

      case 'delete':
        if (id === undefined) {
          throw new Error("id must be provided for 'delete' action.");
        }

        const todoToDelete = updatedTodos.find(todo => todo.id === id);

        if (!todoToDelete) {
          throw new Error(`Todo with ID ${id} not found.`);
        }

        updatedTodos = updatedTodos.filter(todo => todo.id !== id);
        break;

      case 'updateTitle':
        if (id === undefined || newTitle === undefined) {
          throw new Error(
            "ID and new title must be provided for 'update' action.",
          );
        }

        const itemToUpdateTitle = updatedTodos.find(todo => todo.id === id);

        if (!itemToUpdateTitle) {
          throw new Error(`Todo with ID ${id} not found for update.`);
        }

        itemToUpdateTitle.title = newTitle;
        break;

      case 'updateStatus':
        if (id === undefined) {
          throw new Error(
            "ID and new title must be provided for 'update status' action.",
          );
        }

        const itemToUpdateStatus = updatedTodos.find(todo => todo.id === id);

        if (!itemToUpdateStatus) {
          throw new Error(`Todo with ID ${id} not found for update.`);
        }

        const isCompleted = itemToUpdateStatus?.completed;

        itemToUpdateStatus.completed = !isCompleted;
        break;

      case 'updateStatusAll':
        const completed = true;
        const areAllCompleted = updatedTodos.every(todo => todo.completed);

        updatedTodos = updatedTodos.map(todo => {
          if (!areAllCompleted) {
            return {
              ...todo,
              completed: completed,
            };
          } else {
            return {
              ...todo,
              completed: !completed,
            };
          }
        });

        break;

      default:
        throw new Error('Invalid action type.');
    }

    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };

  return [todos, getLocalStorageData, manageLocalStorage];
};
