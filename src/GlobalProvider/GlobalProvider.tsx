import React, { useReducer } from 'react';
import { Todo } from '../types/Todo';

type Action =
  | { type: 'addTodo'; payload: Todo }
  | { type: 'updateTodoStatus'; payload: number }
  | { type: 'updateTodoTitle'; payload: Todo }
  | { type: 'deleteTodo'; payload: number }
  | { type: 'toggleAll' }
  | { type: 'clearCompleted' };

function reducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'addTodo':
      return [...state, action.payload];
    case 'updateTodoStatus':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo,
      );
    case 'updateTodoTitle':
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title }
          : todo,
      );
    case 'toggleAll':
      const allCompleted = state.every(todo => todo.completed);

      return state.map(todo => ({
        ...todo,
        completed: !allCompleted,
      }));
    case 'deleteTodo':
      return state.filter(todo => todo.id !== action.payload);

    case 'clearCompleted':
      return state.filter(todo => !todo.completed);
    default:
      return state;
  }
}

const loadStateFromLocalStorage = (): Todo[] => {
  const savedState = localStorage.getItem('todos');

  if (savedState) {
    return JSON.parse(savedState);
  }

  return [];
};

export const StateContext = React.createContext<Todo[]>([]);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, loadStateFromLocalStorage());

  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state));
  }, [state]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
