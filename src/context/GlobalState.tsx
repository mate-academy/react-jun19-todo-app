import { createContext, ReactNode, useEffect, useReducer } from 'react';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../hook/useLocalStorage';

interface State {
  todos: Todo[] | [];
  filteredTodos: Todo[] | [];
}

export type Action =
  | { type: 'set'; payload: Todo[] }
  | { type: 'create'; payload: Todo[] }
  | { type: 'update'; payload: Todo[] }
  | { type: 'delete'; payload: Todo[] }
  | { type: 'all' }
  | { type: 'active' }
  | { type: 'completed' };

function reducer(state: State, action: Action) {
  const { todos } = state;

  switch (action.type) {
    case 'set':
      const initTodos = action.payload;

      return { todos: initTodos, filteredTodos: initTodos };
    case 'all':
      return { ...state, filteredTodos: todos };
    case 'active':
      const active = todos.filter(todo => {
        return !todo.completed;
      });

      return { ...state, filteredTodos: active };

    case 'completed':
      const completed = todos.filter(todo => {
        return todo.completed;
      });

      return { ...state, filteredTodos: completed };

    case 'create':
    case 'update':
    case 'delete':
      return { ...state, todos: action.payload };

    default:
      return state;
  }
}

const initialState: State = {
  todos: [],
  filteredTodos: [],
};

type Global = {
  children: ReactNode;
};

export const StateContext = createContext(initialState);
// eslint-disable-next-line no-console
export const DispatchContext = createContext(({}: Action) => {});
// export const DispatchContext = createContext((action: Action) => {});

export function GlobalStateProvider({ children }: Global) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { getItem, setItem } = useLocalStorage<Todo[]>('todos');

  // Initialize todos from localStorage
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

  // Sync todos with localStorage
  useEffect(() => {
    setItem(state.todos);
  }, [state.todos, setItem]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
}
