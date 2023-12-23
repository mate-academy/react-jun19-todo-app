import { computed, effect, signal } from '@preact/signals-react';
import {
  getTodosFromLocalStorage,
  setTodosToLocalStorage,
} from '../local-storage';
import { FilterValues, Todo } from '../types';
import { filter } from './filter-signal';

export const todos = signal<Todo[]>(getTodosFromLocalStorage());

effect(() => {
  if (todos.value) {
    setTodosToLocalStorage(todos.value);
  }
});

export const activeTodosCounter = computed<number>(() => {
  return todos.value.filter(todo => !todo.completed).length;
});

export const allTodosCompleted = computed<boolean>(() => {
  if (todos.value.length) {
    return todos.value
      .filter(todo => todo.completed).length === todos.value.length;
  }

  return false;
});

export const filteredTodos = computed<Todo[]>(() => {
  switch (filter.value) {
    default:
    case FilterValues.All:
      return todos.value;
    case FilterValues.Active:
      return todos.value.filter(todo => !todo.completed);
    case FilterValues.Completed:
      return todos.value.filter(todo => todo.completed);
  }
});
