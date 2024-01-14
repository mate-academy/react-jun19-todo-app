import React, { useCallback, useMemo, useState } from 'react';
import { Todo } from '../types/todo';

function useLocalStorage<T>(key: string, startValue: T): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      return startValue;
    }
  });

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}

type TodosContextType = {
  todos: Todo[];
  addTodo: (newTodo: Todo) => void;
  updateTodo: (c: Todo) => void;
};

type Props = {
  children: React.ReactNode;
};

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  addTodo: () => {},
  updateTodo: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const addTodo = useCallback((newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos]);

  const updateTodo = useCallback((updatedTodo: Todo) => {
    const updatedTodos = todos.map(todo => (
      todo.id === updatedTodo.id
        ? { ...todo, complete: updatedTodo.complete }
        : todo
    ));

    // console.log(updatedTodos);

    setTodos(updatedTodos);
  }, [todos]);

  const value = useMemo(() => ({
    todos,
    addTodo,
    updateTodo,
  }), [addTodo, todos, updateTodo]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};

// #region
// interface Action {
//   type: string;
//   payload: Todo;
// }

// function reducer(todos: Todo[], action: Action) {
//   switch (action.type) {
//     case 'addTodo':
//       return [...todos, action.payload];

//     default:
//       return todos;
//   }
// }

// const [todos, dispatch] = useReducer(reducer, []);
// const addTodo = useCallback((newTodo: Todo) => {
//   dispatch({ type: 'addTodo', payload: newTodo });
// }, []);

// const StateContext = React.createContext<Todo[]>(initialTodos);
// const DicpatchContext = React.createContext((action: Action) => {});

//   return (
//     <DicpatchContext.Provider value={dispatch}>
//       <StateContext.Provider value={todos}>
//         {children}
//       </StateContext.Provider>
//     </DicpatchContext.Provider>
//   );
// }
// #endregion