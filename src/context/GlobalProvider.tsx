import { createContext, Dispatch, useEffect, useReducer } from 'react';
import { Filters } from '../types/Filters';
import { Todos } from '../types/Todos';
import { useLocalStorage } from '../hooks/useLocalStorage';

type Action =
  | { type: 'addTodo'; payload: string }
  | { type: 'deleteTodo'; payload: number }
  | { type: 'toggleStatusTodo'; payload: number }
  | { type: 'toggleAllTodos'; payload: boolean }
  | { type: 'filterTodos'; payload: Filters }
  | { type: 'setFilter'; payload: Filters }
  | { type: 'clearCompletedTodos' }
  | { type: 'updateFilteredTodos'; payload: Todos[] }
  | { type: 'renameTodo'; payload: { id: number; title: string } };

interface State {
  todos: Todos[];
  filter: Filters;
  filteredTodos: Todos[];
}

function deriveFilteredTodos(todos: Todos[], filter: Filters): Todos[] {
  switch (filter) {
    case Filters.active:
      return todos.filter(todo => !todo.completed);
    case Filters.completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'addTodo':
      return {
        ...state,
        todos: [
          ...state.todos,
          { title: action.payload, id: Date.now(), completed: false },
        ],
      };
    case 'deleteTodo':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case 'toggleStatusTodo':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };
    case 'toggleAllTodos':
      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: action.payload,
        })),
      };
    case 'setFilter':
      return {
        ...state,
        filter: action.payload,
      };
    case 'filterTodos':
      const filteredTodos = deriveFilteredTodos(state.todos, action.payload);

      return {
        ...state,
        filteredTodos,
      };
    case 'clearCompletedTodos':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };
    case 'updateFilteredTodos':
      return {
        ...state,
        filteredTodos: action.payload,
      };
    case 'renameTodo':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo,
        ),
      };
    default:
      return state;
  }
}

const initialState: State = {
  todos: [],
  filter: Filters.all,
  filteredTodos: [],
};

type Props = {
  children: React.ReactNode;
};

export const StateContext = createContext(initialState);
export const DispatchContext = createContext<Dispatch<Action>>(() => {});

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [localData, setLocalData] = useLocalStorage<Todos[]>('todos', []);
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    todos: localData,
    filteredTodos: deriveFilteredTodos(localData, initialState.filter),
  });

  useEffect(() => {
    setLocalData(state.todos);
  }, [state.todos, setLocalData]);

  useEffect(() => {
    const filtered = deriveFilteredTodos(state.todos, state.filter);

    dispatch({ type: 'updateFilteredTodos', payload: filtered });
  }, [state.todos, state.filter]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
