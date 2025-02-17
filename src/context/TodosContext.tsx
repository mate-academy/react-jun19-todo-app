import { Todo } from '../types/Todo';
import {
  getTodosFromLocalStorage,
  updateTodosInLocalStorage,
} from '../services/localStorage';
import React, { useEffect, useReducer } from 'react';
import { SelectFilter } from '../types/SelectFilter';

type Action =
  | { type: 'updateTodoTitle'; payload: Todo }
  | { type: 'addTodo'; payload: Todo }
  | { type: 'filter'; payload: SelectFilter }
  | { type: 'deleteTodos'; payload: Todo[] }
  | { type: 'toggleTodos'; payload: Todo[] }
  | { type: 'clearVisibleTodos' };

interface State {
  todos: Todo[];
  visibleTodos: Todo[];
}

function reducer(state: State, action: Action): State {
  let newTodos: Todo[] = [];

  switch (action.type) {
    case 'addTodo':
      newTodos = [...state.todos, action.payload];

      return { ...state, todos: newTodos };

    case 'deleteTodos':
      newTodos = state.todos.filter(todo => !action.payload.includes(todo));

      return {
        ...state,
        todos: newTodos,
      };

    case 'toggleTodos':
      newTodos = state.todos.map(todo =>
        action.payload.includes(todo)
          ? { ...todo, completed: !todo.completed }
          : todo,
      );

      return { ...state, todos: newTodos };

    case 'clearVisibleTodos':
      return { ...state, visibleTodos: [] };

    case 'updateTodoTitle':
      newTodos = state.todos.map(todo =>
        todo.id === action.payload.id ? action.payload : todo,
      );

      return { ...state, todos: newTodos };

    case 'filter':
      if (action.payload === 'All') {
        return { ...state, visibleTodos: [...state.todos] };
      }

      return {
        ...state,
        visibleTodos: state.todos.filter(todo =>
          action.payload === 'Completed' ? todo.completed : !todo.completed,
        ),
      };

    default:
      return state;
  }
}

const initialState: State = {
  todos: getTodosFromLocalStorage(),
  visibleTodos: getTodosFromLocalStorage(),
};

export const StateContext = React.createContext(initialState);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DispatchContext = React.createContext((_action: Action) => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    updateTodosInLocalStorage(state.todos);
  }, [state.todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
