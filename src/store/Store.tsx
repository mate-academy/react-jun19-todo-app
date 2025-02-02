import React, { useEffect, useReducer } from 'react';
import { Todo } from '../types/Todo';
import { FilterStatus } from '../types/FilterStatus';

type Action =
  | { type: 'addTodo'; payload: Todo }
  | { type: 'setTitle'; payload: string }
  | { type: 'deleteTodo'; payload: number }
  | { type: 'toggleCompleted'; payload: number }
  | { type: 'setFilterStatus'; payload: FilterStatus }
  | { type: 'setInputDisabled'; payload: boolean }
  | { type: 'clearAllComplitedTodos' }
  | { type: 'editTodo'; payload: { id: number; title: string } }
  | { type: 'toggleAllCompleted' }
  | { type: 'updateTodo'; payload: Todo };

interface State {
  todos: Todo[];
  filterStatus: FilterStatus;
}

function reducer(state: State, action: Action) {
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

    case 'toggleCompleted':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }

          return todo;
        }),
      };

    case 'toggleAllCompleted':
      const isAllCompleted = state.todos.every(todo => todo.completed);

      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: !isAllCompleted,
        })),
      };

    case 'setFilterStatus':
      return {
        ...state,
        filterStatus: action.payload,
      };

    case 'clearAllComplitedTodos':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };

    case 'editTodo':
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              title: action.payload.title,
            };
          }

          return todo;
        }),
      };

    default:
      return state;
  }
}

const initialState: State = {
  todos: JSON.parse(localStorage.getItem('todos') || '[]'),
  filterStatus: FilterStatus.All,
};

export const StateContext = React.createContext(initialState);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
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
