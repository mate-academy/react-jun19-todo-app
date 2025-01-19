import React, { useReducer } from 'react';

import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

type UpdateAction = {
  type: 'updateTodo';
  payload: { todoId: number; data: Partial<Omit<Todo, 'id'>> };
};

export type Action =
  | { type: 'changeFilter'; payload: Filter }
  | { type: 'createTodo'; payload: string }
  | { type: 'deleteTodo'; payload: number }
  | { type: 'toggleAll' }
  | { type: 'deleteCompleted' }
  | UpdateAction;

interface State {
  filter: Filter;
  activeCount: number;
  todos: Todo[];
}

function loadTodos(): Todo[] {
  const todos = localStorage.getItem('todos');

  if (!todos) {
    return [];
  }

  try {
    return JSON.parse(todos);
  } catch {}

  localStorage.removeItem('todos');

  return [];
}

function getInitialState(): State {
  const state: State = {
    filter: Filter.all,
    activeCount: 0,
    todos: loadTodos(),
  };

  if (state.todos.length) {
    state.activeCount = state.todos.reduce(
      (prev, todo) => prev + +!todo.completed,
      0,
    );
  }

  return state;
}

const initialState = getInitialState();

const reducer = (state: State, action: Action): State => {
  if (action.type === 'changeFilter') {
    return {
      ...state,
      filter: action.payload,
    };
  }

  if (action.type === 'createTodo') {
    const { todos, activeCount } = state;
    const nextId = Math.max(0, ...todos.map(todo => todo.id)) + 1;

    const newTodo: Todo = {
      id: nextId,
      title: action.payload,
      completed: false,
    };

    return {
      ...state,
      todos: [...todos, newTodo],
      activeCount: activeCount + 1,
    };
  }

  if (action.type === 'deleteTodo') {
    const { todos, activeCount } = state;

    const index = todos.findIndex(todo => todo.id === action.payload);

    if (index === -1) {
      return state;
    }

    const todo = todos[index];

    return {
      ...state,
      activeCount: activeCount - +!todo.completed,
      todos: [...todos.splice(0, index), ...todos.splice(index + 1)],
    };
  }

  if (action.type === 'deleteCompleted') {
    const { todos, activeCount } = state;

    if (activeCount === todos.length) {
      return state;
    }

    const filteredTodos = todos.filter(todo => !todo.completed);

    return {
      ...state,
      todos: filteredTodos,
      activeCount: filteredTodos.length,
    };
  }

  if (action.type === 'toggleAll') {
    const { todos, activeCount } = state;
    const completed = activeCount !== 0;

    return {
      ...state,
      activeCount: completed ? 0 : todos.length,
      todos: todos.map(todo => ({ ...todo, completed })),
    };
  }

  if (action.type === 'updateTodo') {
    const { todos } = state;

    const data = action.payload.data;
    const todoId = action.payload.todoId;

    const index = todos.findIndex(todo => todo.id === todoId);

    if (index === -1) {
      return state;
    }

    Object.assign(todos[index], data);

    return {
      ...state,
      todos: [...todos],
      activeCount: todos.reduce((prev, todo) => prev + +!todo.completed, 0),
    };
  }

  return state;
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext<(action: Action) => void>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const GloabalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
