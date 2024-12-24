import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useReducer,
  useState,
} from 'react';
import {
  getLocaleStorageTodos,
  setLocaleStorageTodos,
} from '../utils/localStorageTodos';

import { filterByTodos, filteredTodos } from '../helpers/todosHelpers';

import { Todo } from '../types/Todo';
import { Field } from '../types/Field';

type TodoContextType = {
  todos: Todo[];
  field: Field;
  preparedTodos: Todo[];
  isDeleted: boolean;
  completedTodosLength: number;
  editTitle: (todo: Todo, title: string) => void;
  setIsDeleted: Dispatch<SetStateAction<boolean>>;
  editField: (field: Field) => void;
  handleDeleteTodo: (todoForDelete: Todo) => void;
  changeComplete: (toggleTodo: Todo) => void;
  handleAdd: (newTodos: Todo[]) => void;
  changeCompleteAll: () => void;
  deleteCompletedTodos: () => void;
};
export const TodoContext = React.createContext<TodoContextType>({
  todos: [],
  field: Field.ALL,
  preparedTodos: [],
  isDeleted: false,
  completedTodosLength: 0,
  editTitle: () => {},
  setIsDeleted: () => {},
  handleDeleteTodo: () => {},
  editField: () => {},
  changeComplete: () => {},
  handleAdd: () => {},
  changeCompleteAll: () => {},
  deleteCompletedTodos: () => {},
});

type Props = {
  children: React.ReactNode;
};

type Action =
  | { type: 'getTodos' }
  | { type: 'editTitle'; payload: { todo: Todo; title: string } }
  | { type: 'changeComplete'; payload: { toggleTodo: Todo } }
  | { type: 'changeCompleteAll'; payload: { completedTodosLength: number } }
  | { type: 'deleteCompletedTodos' }
  | { type: 'handleDeleteTodo'; payload: { todoForDelete: Todo } }
  | { type: 'handleAdd'; payload: { newTodos: Todo[] } };

export const TodoProvider: React.FC<Props> = ({ children }) => {
  function reducer(todos: Todo[], action: Action) {
    switch (action.type) {
      case 'editTitle':
        const updatedTodo = todos.map(currentTodo =>
          action.payload.todo.id === currentTodo.id
            ? { ...currentTodo, title: action.payload.title?.trim() }
            : currentTodo,
        );

        setLocaleStorageTodos(updatedTodo);

        return updatedTodo;

      case 'changeComplete':
        const updatedTodos = todos.map((todoItem: Todo) =>
          action.payload.toggleTodo.id === todoItem.id
            ? { ...todoItem, completed: !todoItem.completed }
            : todoItem,
        );

        setLocaleStorageTodos(updatedTodos);

        return updatedTodos;
      case 'changeCompleteAll':
        let changedTodos;

        if (!action.payload.completedTodosLength) {
          changedTodos = todos.map(todo => ({
            ...todo,
            completed: !todo.completed,
          }));
        } else {
          changedTodos = todos.map(todo => ({
            ...todo,
            completed: true,
          }));
        }

        setLocaleStorageTodos(changedTodos);

        return changedTodos;
      case 'deleteCompletedTodos':
        const allTodos = todos.filter(todo => !todo.completed);

        setLocaleStorageTodos(allTodos);

        return allTodos;
      case 'handleDeleteTodo':
        const ourTodos = todos.filter(
          (todoItem: Todo) => todoItem.id !== action.payload.todoForDelete.id,
        );

        setLocaleStorageTodos(ourTodos);

        return ourTodos;
      case 'handleAdd':
        return action.payload.newTodos;
      default:
        return todos;
    }
  }

  const initialState = () => {
    const getTodos = getLocaleStorageTodos();

    if (!getTodos.length) {
      localStorage.setItem('todos', JSON.stringify([]));

      return [];
    } else {
      return getTodos;
    }
  };

  const [todos, dispatch] = useReducer(reducer, initialState());
  const [field, setField] = useState<Field>(Field.ALL);
  const [isDeleted, setIsDeleted] = useState(false);

  const preparedTodos = filteredTodos(todos, field);
  const completedTodosLength = filterByTodos(todos).length;

  const editTitle = useCallback(
    (todo: Todo, title: string) => {
      dispatch({ type: 'editTitle', payload: { todo, title } });
    },
    [todos],
  );
  const changeComplete = useCallback(
    (toggleTodo: Todo) => {
      dispatch({ type: 'changeComplete', payload: { toggleTodo } });
    },
    [todos],
  );

  const changeCompleteAll = useCallback(() => {
    dispatch({ type: 'changeCompleteAll', payload: { completedTodosLength } });
  }, [todos, completedTodosLength]);

  const deleteCompletedTodos = useCallback(() => {
    dispatch({ type: 'deleteCompletedTodos' });
    setIsDeleted(true);
  }, [todos]);

  const handleDeleteTodo = useCallback(
    (todoForDelete: Todo) => {
      dispatch({ type: 'handleDeleteTodo', payload: { todoForDelete } });
      setIsDeleted(true);
    },
    [todos],
  );

  const editField = useCallback((fieldValue: Field) => {
    setField(fieldValue);
  }, []);
  const handleAdd = useCallback((newTodos: Todo[]) => {
    dispatch({ type: 'handleAdd', payload: { newTodos } });
  }, []);

  const values = useMemo(
    () => ({
      todos,
      field,
      preparedTodos,
      handleDeleteTodo,
      isDeleted,
      completedTodosLength,
      editTitle,
      setIsDeleted,
      handleAdd,
      editField,
      changeComplete,
      changeCompleteAll,
      deleteCompletedTodos,
    }),
    [
      todos,
      field,
      isDeleted,
      preparedTodos,
      editTitle,
      setIsDeleted,
      handleAdd,
      completedTodosLength,
      handleDeleteTodo,
      changeComplete,
      changeCompleteAll,
      editField,
      deleteCompletedTodos,
    ],
  );

  return <TodoContext.Provider value={values}>{children}</TodoContext.Provider>;
};
