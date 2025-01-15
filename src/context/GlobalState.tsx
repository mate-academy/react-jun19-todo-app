import React, { createContext, ReactNode, useEffect, useReducer } from 'react';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../hook/useLocalStorage';
import { FilterType } from '../enum/filter';

type Filter = FilterType.All | FilterType.Active | FilterType.Completed;

interface State {
  todos: Todo[] | [];
  filteredTodos: Todo[] | [];
  filter: Filter;
}

export type Action =
  | { type: 'set'; payload: Todo[] }
  | { type: 'update'; payload: Todo[] }
  | { type: FilterType.All }
  | { type: FilterType.Active }
  | { type: FilterType.Completed };

function reducer(state: State, action: Action): State {
  const { todos } = state;

  switch (action.type) {
    case 'set':
      const initTodos = action.payload;

      return { ...state, todos: initTodos, filteredTodos: initTodos };
    case FilterType.All:
      return { ...state, filteredTodos: todos, filter: FilterType.All };
    case FilterType.Active:
      const active = todos.filter(todo => {
        return !todo.completed;
      });

      return { ...state, filteredTodos: active, filter: FilterType.Active };

    case FilterType.Completed:
      const completed = todos.filter(todo => {
        return todo.completed;
      });

      return {
        ...state,
        filteredTodos: completed,
        filter: FilterType.Completed,
      };

    case 'update':
      const updatedTodos = action.payload;

      let updatedFilteredTodos = updatedTodos;

      if (state.filter === FilterType.Active) {
        updatedFilteredTodos = updatedTodos.filter(todo => !todo.completed);
      } else if (state.filter === FilterType.Completed) {
        updatedFilteredTodos = updatedTodos.filter(todo => todo.completed);
      }

      return {
        ...state,
        todos: updatedTodos,
        filteredTodos: updatedFilteredTodos,
      };

    default:
      return state;
  }
}

const initialState: State = {
  todos: [],
  filteredTodos: [],
  filter: FilterType.All,
};

type Global = {
  children: ReactNode;
};

export const StateContext = createContext(initialState);
export const DispatchContext = createContext<React.Dispatch<Action>>(() => {});

export function GlobalStateProvider({ children }: Global) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { getItem, setItem } = useLocalStorage<Todo[]>('todos');

  useEffect(() => {
    const todoList = getItem();

    if (todoList) {
      dispatch({ type: 'set', payload: todoList });
    } else {
      dispatch({
        type: 'set',
        payload: [],
      });
    }
  }, [getItem]);

  useEffect(() => {
    setItem(state.todos);
  }, [state.todos, setItem]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
}
