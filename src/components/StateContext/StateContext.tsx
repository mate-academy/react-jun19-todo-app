import React, { Reducer, useReducer } from 'react';
import { Action } from '../../types/Action';
import { ActionType } from '../../types/ActionType';
import { FilterType } from '../../types/FilterType';
import { State } from '../../types/State';
import { Todo } from '../../types/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';

const initialState: State = {
  filter: FilterType.All,
  todos: [],
};

interface Props {
  children: React.ReactNode;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.Add: {
      return { ...state, todos: [...state.todos, action.payload] };
    }

    case ActionType.Delete: {
      const updatedTodos = state.todos.filter(
        todo => todo.id !== action.payload,
      );

      return { ...state, todos: updatedTodos };
    }

    case ActionType.AllCompletedDelete: {
      const updatedTodos = state.todos.filter(todo => !todo.completed);

      return { ...state, todos: updatedTodos };
    }

    case ActionType.Completed: {
      const updatedTodos = state.todos.map(todo => {
        return todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo;
      });

      return { ...state, todos: updatedTodos };
    }

    case ActionType.AllCompleted: {
      const allCompleted = state.todos.every(todo => todo.completed);

      const updatedTodos = state.todos.map(todo => ({
        ...todo,
        completed: !allCompleted,
      }));

      return { ...state, todos: updatedTodos };
    }

    case ActionType.UpdateTitle: {
      const { id, title } = action.payload;

      const updatedTodos = state.todos.map(todo => {
        return todo.id === id ? { ...todo, title } : todo;
      });

      return { ...state, todos: updatedTodos };
    }

    case ActionType.FilterAll: {
      return { ...state, filter: FilterType.All };
    }

    case ActionType.FilterActive: {
      return { ...state, filter: FilterType.Active };
    }

    case ActionType.FilterCompleted: {
      return { ...state, filter: FilterType.Completed };
    }

    default:
      return state;
  }
}

export const StateContext = React.createContext<State>(initialState);
export const DispatchContext = React.createContext<(action: Action) => void>(
  () => {},
);

export const StateProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>(initialState.todos);
  const [state, dispatch] = useReducer<Reducer<State, Action>>(reducer, {
    ...initialState,
    todos,
  });

  const onDispatch = (action: Action) => {
    const newState = reducer(state, action);

    setTodos(newState.todos);
    dispatch(action);
  };

  return (
    <DispatchContext.Provider value={onDispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
