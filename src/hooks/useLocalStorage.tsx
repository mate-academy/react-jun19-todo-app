import { useState } from 'react';
import { Todo } from '../types/Todo';

export function useLocalStorage<Todo>(
  key: string,
  startTodo: Todo,
): [Todo, (t: Todo) => void] {
  const [todo, setTodo] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      localStorage.setItem(key, JSON.stringify(startTodo));

      return startTodo;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      localStorage.removeItem(key);

      return startTodo;
    }
  });

  const save = (newTodo: Todo) => {
    localStorage.setItem(key, JSON.stringify(newTodo));
    setTodo(newTodo);
  };

  return [todo, save];
}

export function useLocalStorageRemoveTodo(todo: Todo) {
  const todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '');
  const index = todos.findIndex(t => t.id === todo.id);

  todos.splice(index, 1);
  const todosToStr = JSON.stringify(todos);

  localStorage.setItem('todos', todosToStr);
}

export function useLocalStorageToggleCompleted(todo: Todo) {
  const todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '');
  const index = todos.findIndex(t => t.id === todo.id);

  todos[index].completed = !todos[index].completed;
  const todosToStr = JSON.stringify(todos);

  localStorage.setItem('todos', todosToStr);
}
// export function useLocalStorage<T>(key: string, startValue: T) {//   const [value, setValue] = useState(() => {//     const data = localStorage.getItem(key);
//     if (data === null) {//       return startValue;//     }
//     try {//       return JSON.parse(data);//     } catch (e) {//       localStorage.removeItem(key);
//       return startValue;//     }//   });
//   const save = (newValue: T) => {//     localStorage.setItem(key, JSON.stringify(newValue));//     setValue(newValue);//   };
//   return [value, save];// }
