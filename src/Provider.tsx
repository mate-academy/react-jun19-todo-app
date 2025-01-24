import React, { useEffect, useReducer } from 'react';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

export interface State {
  todos: Todo[];
  filter: Filter;
}

type Props = {
  children: React.ReactNode;
};

type Action =
  | { type: 'addTodo'; payload: Todo }
  | { type: 'deleteTodo'; payload: number }
  | { type: 'updateTodo'; payload: Todo }
  | { type: 'filterTodo'; payload: Filter }
  | { type: 'deleteCompletedTodos'; payload: number[] };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'addTodo':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case 'deleteTodo':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case 'updateTodo':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? action.payload : todo,
        ),
      };

    case 'filterTodo':
      return {
        ...state,
        filter: action.payload,
      };

    case 'deleteCompletedTodos':
      return {
        ...state,
        todos: state.todos.filter(todo => !action.payload.includes(todo.id)),
      };

    default:
      return state;
  }
};

const loadedTodos = localStorage.getItem('todos');
const initialState: State = {
  todos: loadedTodos ? JSON.parse(loadedTodos) : [],
  filter: Filter.All,
};

export const StateContext = React.createContext<State>(initialState);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

export const Provider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
