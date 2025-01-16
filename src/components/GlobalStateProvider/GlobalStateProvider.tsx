import React, { useEffect } from 'react';
import { Todo } from '../../types/Todo';
import { getInitialTodos } from '../../utils/getInitialTodos';


type Action =
  { type: 'addTodo', payload: Todo }
  | { type: 'deleteTodo', payload: Todo }
  | { type: 'setTodoComplete', payload: Todo }
  | { type: 'toggleTodos' }
  | { type: 'updateTodoTitle', payload: Todo }
  | { type: 'deleteCompletedTodos' }


interface State {
  todos: Todo[];
}


const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'addTodo':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'deleteTodo':
      return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload.id) };
    case 'setTodoComplete':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'toggleTodos':
      const areAllTodosCompleted = state.todos.every(todo => todo.completed);
      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: !areAllTodosCompleted,
        })),
      };
    case 'updateTodoTitle':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
            : todo
        ),
      };
      case 'deleteCompletedTodos':
        return {
          ...state,
          todos: state.todos.filter(todo => !todo.completed)
        };
    default:
      return state;
  }
};


const initialState: State = {
  todos: getInitialTodos()
};


export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext((action: Action) => { });


type Props = {
  children: React.ReactNode
}


export const GlobalStateProvider: React.FC<Props> = ({ children }) => {

  const [{ todos }, dispatch] = React.useReducer(reducer, initialState);


  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);


  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={{ todos }}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
