import React, { useReducer } from 'react';
import { Todo } from '../types/Todo';

interface State {
  todos: Todo[];
  newTodo: string;
  focusNewTodo: boolean;
  useTodos: 'All' | 'Active' | 'Completed';
  changerTodo: string;
}

type Action =
  | { type: 'add' }
  | { type: 'changeTodo'; text: string }
  | { type: 'remove'; id: number }
  | { type: 'checked'; id: number }
  | { type: 'setChanged'; id: number }
  | { type: 'changed'; id: number; text: string }
  | { type: 'setAllCompleate'; use: boolean }
  | { type: 'setUseTodos'; name: 'All' | 'Active' | 'Completed' }
  | { type: 'clearAll' }
  | { type: 'setTodos'; tod: Todo[] }
  | { type: 'setFocudNewTodo' }
  | { type: 'escapeChangedText'; id: number };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'changeTodo':
      return {
        ...state,
        newTodo: action.text,
      };

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

    case 'remove':
      return {
        ...state,
        todos: [...state.todos.filter(todo => todo.id !== action.id)],
        focusNewTodo: true,
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
        changerTodo:
          state.todos.find(todo => todo.id === action.id)?.title || '',
      };

    case 'changed':
      return {
        ...state,
        todos: [
          ...state.todos.map(todo => {
            if (todo.id === action.id) {
              return {
                ...todo,
                title: action.text,
              };
            } else {
              return todo;
            }
          }),
        ],
      };

    case 'setAllCompleate':
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

    case 'setUseTodos':
      return {
        ...state,
        useTodos: action.name,
      };

    case 'clearAll':
      return {
        ...state,
        todos: [
          ...state.todos.filter(todo => {
            return !todo.completed;
          }),
        ],
        focusNewTodo: !state.focusNewTodo,
      };

    case 'setTodos':
      return {
        ...state,
        todos: [...action.tod],
      };

    case 'setFocudNewTodo':
      return {
        ...state,
        focusNewTodo: !state.focusNewTodo,
      };

    case 'escapeChangedText':
      return {
        ...state,
        todos: [
          ...state.todos.map(todo => {
            if (todo.id === action.id) {
              return {
                ...todo,
                title: state.changerTodo,
              };
            } else {
              return todo;
            }
          }),
        ],
      };

    default:
      return state;
  }
};

const initialState: State = {
  todos: [],
  newTodo: '',
  useTodos: 'All',
  focusNewTodo: true,
  changerTodo: '',
};

const defaultDispatch: React.Dispatch<Action> = () => {};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext(defaultDispatch);

type Props = {
  children: React.ReactNode;
};

export const GlobalstateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
