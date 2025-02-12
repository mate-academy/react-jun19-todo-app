import React, { useEffect, useReducer } from 'react';
import { Filter } from './types/Filter';
import { Todo } from './types/todo';

type Action =
  | { type: 'addNewTodo'; payload: Todo }
  | { type: 'updateTodo'; payload: Todo }
  | { type: 'deleteTodo'; payload: number }
  | { type: 'clearCompleted' }
  | { type: 'setFilter'; payload: Filter }
  | { type: 'setSaveingIds'; payload: number }
  | { type: 'removeSaveingId'; payload: number }
  | { type: 'setEditingTodo'; payload: Todo | null }
  | { type: 'saveALL' };

interface State {
  todos: Todo[];
  filter: Filter;
  saveingIds: number[];
  editingTodo: Todo | null;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'addNewTodo':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case 'updateTodo':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? action.payload : todo,
        ),
      };

    case 'deleteTodo':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case 'setFilter':
      return {
        ...state,
        filter: action.payload,
      };

    case 'setSaveingIds':
      return {
        ...state,
        saveingIds: state.saveingIds.includes(action.payload)
          ? state.saveingIds
          : [...state.saveingIds, action.payload],
      };

    case 'removeSaveingId':
      return {
        ...state,
        saveingIds: state.saveingIds.filter(id => id !== action.payload),
      };

    case 'setEditingTodo':
      return {
        ...state,
        editingTodo: action.payload,
      };

    case 'clearCompleted':
      return {
        ...state,
        todos: state.todos.filter(el => !el.completed),
      };

    case 'saveALL':
      const allCompleted = state.todos.every(todo => todo.completed);
      const allActive = state.todos.every(todo => !todo.completed);

      if (!allCompleted && !allActive) {
        return {
          ...state,
          todos: state.todos.map(el => {
            return !el.completed ? { ...el, completed: true } : el;
          }),
        };
      }

      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: !todo.completed,
        })),
      };

    default:
      return state;
  }
}

const getInitialTodos = (): Todo[] => {
  const savedTodos = localStorage.getItem('todos');

  return savedTodos ? JSON.parse(savedTodos) : [];
};

const initialState: State = {
  todos: getInitialTodos(),
  filter: Filter.ALL,
  saveingIds: [],
  editingTodo: null,
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext((action: Action) => {});

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
