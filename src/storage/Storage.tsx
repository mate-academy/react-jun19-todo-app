import React, { useReducer } from 'react';
import { Todo } from '../types/Todo';

interface State {
  todos: Todo[];
  newTodo: string;
  focusTodo: boolean;
  sortTodos: 'All' | 'Active' | 'Completed';
  changeTodo: string;
}

type Action =
  | { type: 'add' }
  | { type: 'changeTodo'; title: string }
  | { type: 'changed'; id: number; title: string }
  | { type: 'setChanged'; id: number }
  | { type: 'checked'; id: number }
  | { type: 'setAllCompleted'; use: boolean }
  | { type: 'setSortTodos'; name: 'All' | 'Active' | 'Completed' }
  | { type: 'setTodos'; todo: Todo[] }
  | { type: 'setFocusedTodo' }
  | { type: 'cancelChangingTodo'; id: number }
  | { type: 'remove'; id: number }
  | { type: 'clearAll' };

const initialState: State = {
  todos: [],
  newTodo: '',
  focusTodo: true,
  sortTodos: 'All',
  changeTodo: '',
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: +new Date(),
            title: state.newTodo.trim(),
            completed: false,
            changed: false,
          },
        ],
      };

    case 'changeTodo':
      return {
        ...state,
        newTodo: action.title,
      };

    case 'changed':
      return {
        ...state,
        todos: [
          ...state.todos.map(todo => {
            if (todo.id === action.id) {
              return {
                ...todo,
                title: action.title,
              };
            } else {
              return todo;
            }
          }),
        ],
      };

    case 'setChanged':
      return {
        ...state,
        todos: [
          ...state.todos
            .map(todo => {
              if (todo.id === action.id) {
                return {
                  ...todo,
                  changed: !todo.changed,
                  title: todo.title.trim(),
                };
              } else {
                return todo;
              }
            })
            .filter(todo => todo.title),
        ],
        changeTodo:
          state.todos.find(todo => todo.id === action.id)?.title || '',
      };

    case 'checked':
      return {
        ...state,
        todos: [
          ...state.todos.map(todo => {
            if (todo.id === action.id) {
              return {
                ...todo,
                completed: !todo.completed,
              };
            } else {
              return todo;
            }
          }),
        ],
      };

    case 'setAllCompleted':
      return {
        ...state,
        todos: [
          ...state.todos.map(todo => {
            return {
              ...todo,
              completed: !action.use,
            };
          }),
        ],
      };

    case 'setSortTodos':
      return {
        ...state,
        sortTodos: action.name,
      };

    case 'setTodos':
      return {
        ...state,
        todos: [...action.todo],
      };

    case 'setFocusedTodo':
      return {
        ...state,
        focusTodo: !state.focusTodo,
      };

    case 'cancelChangingTodo':
      return {
        ...state,
        todos: [
          ...state.todos.map(todo => {
            if (todo.id === action.id) {
              return {
                ...todo,
                title: state.changeTodo,
              };
            } else {
              return todo;
            }
          }),
        ],
      };

    case 'remove':
      return {
        ...state,
        todos: [...state.todos.filter(todo => todo.id !== action.id)],
        focusTodo: !state.focusTodo,
      };

    case 'clearAll':
      return {
        ...state,
        todos: [
          ...state.todos.filter(todo => {
            return !todo.completed;
          }),
        ],
        focusTodo: !state.focusTodo,
      };

    default:
      return state;
  }
};

const defaultDispatch: React.Dispatch<Action> = () => {};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext(defaultDispatch);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
