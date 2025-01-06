import React, {
  ReactNode,
  useContext,
  createContext,
  useReducer,
  useState,
} from 'react';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { filterTodos } from './services/Filtering';

type Action =
  | { type: 'ADD_TODO'; title: string }
  | { type: 'TOGGLE_TODO'; id: string }
  | { type: 'DELETE_TODO'; id: string }
  | { type: 'TOGGLE_ALL' }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'UPDATE_TITLE'; id: string; title: string };

const initialState: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');

const todosReducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case 'ADD_TODO':
      const newTodo: Todo = {
        id: new Date().getTime().toString(),
        title: action.title,
        completed: false,
      };

      return [...state, newTodo];

    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo,
      );

    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.id);

    case 'TOGGLE_ALL':
      const allCompleted = state.every(todo => todo.completed);

      return state.map(todo => ({
        ...todo,
        completed: !allCompleted,
      }));

    case 'UPDATE_TITLE':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, title: action.title } : todo,
      );

    case 'CLEAR_COMPLETED':
      return state.filter(todo => !todo.completed);

    default:
      return state;
  }
};

interface TodosContextType {
  todos: Todo[];
  filteredTodos: Todo[];
  dispatch: React.Dispatch<Action>;
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
}

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const useTodos = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('useTodos must be used within a TodosProvider');
  }

  return context;
};

interface TodosProviderProps {
  children: ReactNode;
}

export const TodosProvider: React.FC<TodosProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(todosReducer, initialState);
  const [filter, setFilter] = useState<Filter>(Filter.All);

  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state));
  }, [state]);

  const filteredTodos = filterTodos(state, filter);

  return (
    <TodosContext.Provider
      value={{ todos: state, filteredTodos, dispatch, filter, setFilter }}
    >
      {children}
    </TodosContext.Provider>
  );
};
