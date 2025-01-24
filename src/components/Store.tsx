import React, { useEffect, useReducer } from 'react';
import { Todo } from '../types/Todo';
import { TodoStatus } from '../types/TodoStatus';
import { FilterTodos } from '../types/FilterTodos';

type State = {
  todos: Todo[];
  newTodoTitle: string;
  status: TodoStatus;
  filter: FilterTodos;
};

const getTodosFromLocalStorage = (): Todo[] => {
  const todos = localStorage.getItem('todos');

  return todos ? JSON.parse(todos) : [];
};

const initialTodos: Todo[] = getTodosFromLocalStorage();

const initialState: State = {
  todos: initialTodos,
  newTodoTitle: '',
  status: TodoStatus.all,
  filter: FilterTodos.All,
};

type Action =
  | { type: 'addTodo'; payload: Todo }
  | { type: 'deleteTodo'; payload: number }
  | { type: 'updateTodo'; payload: Todo }
  | { type: 'setNewTodoTitle'; payload: string }
  | { type: 'setAllCompleted'; payload: boolean }
  | { type: 'setStatus'; payload: TodoStatus }
  | { type: 'setNewStatus'; payload: Todo }
  | { type: 'setFilterByStatus'; payload: FilterTodos }
  | { type: 'clearAllCompleted' };

function reducer(state: State, action: Action): State {
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
    case 'updateTodo':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo,
        ),
      };
    case 'setNewTodoTitle':
      return {
        ...state,
        newTodoTitle: action.payload,
      };
    case 'setAllCompleted':
      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: action.payload,
        })),
      };
    case 'setStatus':
      return {
        ...state,
        status: action.payload,
      };
    case 'setNewStatus':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };
    case 'setFilterByStatus':
      return {
        ...state,
        filter: action.payload,
      };
    case 'clearAllCompleted':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };
    default:
      return state;
  }
}

export const StateContext = React.createContext<State>(initialState);
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
