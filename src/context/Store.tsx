import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  useContext,
  useReducer,
} from 'react';
import { Todo } from '../types/Todo';
import { getLocalStorage } from '../utils/getLocalStorageData';

type Action =
  | { type: 'add'; payload: string }
  | { type: 'update'; payload: Todo }
  | { type: 'delete'; payload: number };

function reducer(todos: Todo[], action: Action) {
  let newTodos: Todo[] = [];

  switch (action.type) {
    case 'add':
      newTodos = [
        ...todos,
        {
          id: +new Date(),
          title: action.payload,
          completed: false,
        },
      ];
      break;

    case 'update':
      newTodos = todos.map(todo =>
        todo.id === action.payload.id ? action.payload : todo,
      );
      break;

    case 'delete':
      newTodos = todos.filter(todo => todo.id !== action.payload);
      break;

    default:
      return todos;
  }

  localStorage.setItem('todos', JSON.stringify(newTodos));

  return newTodos;
}

const initialTodos: Todo[] = getLocalStorage<Todo[]>('todos', []);

const defaultDispatch: Dispatch<Action> = () => {};

export const TodosContext = createContext(initialTodos);
export const DispatchContext = createContext(defaultDispatch);

type Props = {
  children: ReactNode;
};

export const GlobalStateProvider: FC<Props> = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, initialTodos);

  return (
    <DispatchContext.Provider value={dispatch}>
      <TodosContext.Provider value={todos}>{children}</TodosContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useGlobalState = () => useContext(TodosContext);

export const useDispatch = () => useContext(DispatchContext);
