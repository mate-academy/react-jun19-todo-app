import { Action } from './types/Action';
import { Filter } from './types/Filter';
import { State } from './types/State';
import { useEffect, useReducer } from 'react';
import React from 'react';

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

    case 'setFilter':
      return {
        ...state,
        filter: action.payload,
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

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
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
