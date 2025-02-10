import React, { createContext, ReactNode, useEffect, useReducer } from 'react';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const FILTERS = {
  ALL: 'ALL',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
} as const;

export type FilterType = (typeof FILTERS)[keyof typeof FILTERS];

type State = {
  todos: Todo[];
  filter: FilterType;
};

type Context = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export const TodosContext = createContext<Context>({
  state: { todos: [], filter: FILTERS.ALL },
  dispatch: () => {},
});

type Action =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'RENAME_TODO'; payload: { id: number; title: string } }
  | { type: 'DELETE_TODO'; payload: { id: number } }
  | { type: 'SET_FILTER'; payload: FilterType }
  | { type: 'TOGGLE_TODO'; payload: { id: number } }
  | { type: 'TOGGLE_ALL'; payload: Todo[] }
  | { type: 'DELETE_COMPLETED'; payload: Todo[] };

const addTodo = (todos: Todo[], newTodo: Todo) => [...todos, newTodo];

const renameTodo = (todos: Todo[], id: number, newName: string) => {
  return todos.map(todo => {
    return todo.id === id ? { ...todo, title: newName } : todo;
  });
};

const deleteTodo = (todos: Todo[], id: number) => {
  return todos.filter(todo => todo.id !== id);
};

const toggleTodo = (todos: Todo[], id: number) => {
  return todos.map(todo => {
    return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
  });
};

const toggleAll = (todos: Todo[]) => {
  const isTodosCompleted = todos.every(todo => todo.completed);

  if (isTodosCompleted) {
    return todos.map(todo => {
      return { ...todo, completed: false };
    });
  }

  return todos.map(todo => {
    return { ...todo, completed: true };
  });
};

const deleteCompleted = (todos: Todo[]) => {
  return todos.filter(todo => !todo.completed);
};

export const todosReducer = (state: State, action: Action): State => {
  const { todos } = state;
  const { type, payload } = action;

  switch (type) {
    case 'ADD_TODO':
      return { ...state, todos: addTodo(todos, payload) };

    case 'RENAME_TODO': {
      const { id, title } = payload;

      return {
        ...state,
        todos: renameTodo(todos, id, title),
      };
    }

    case 'DELETE_TODO': {
      const { id } = payload;

      return { ...state, todos: deleteTodo(todos, id) };
    }

    case 'SET_FILTER':
      return { ...state, filter: payload };

    case 'TOGGLE_TODO':
      const { id } = payload;

      return {
        ...state,
        todos: toggleTodo(todos, id),
      };

    case 'TOGGLE_ALL':
      return { ...state, todos: toggleAll(todos) };

    case 'DELETE_COMPLETED':
      return { ...state, todos: deleteCompleted(todos) };

    default:
      return state;
  }
};

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const savedTodos = localStorage.getItem('todos');
  const initialTodos = savedTodos ? JSON.parse(savedTodos) : [];

  const [state, dispatch] = useReducer(todosReducer, {
    todos: initialTodos,
    filter: FILTERS.ALL,
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
