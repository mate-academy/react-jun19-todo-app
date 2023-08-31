import React, { useContext, useState } from 'react';
import { Todo } from './types/Todo';
import { postTodos } from './api/todos';
import { TodosContext } from './TodoContext';
import { ErrorStatus } from './types/Error';

type Props = {
  todos: Todo[],
  setTodos(todosArray: Todo[]): void,
};

export const Header: React.FC<Props> = ({
  todos,
  setTodos,
}) => {
  const {
    setTempTodo,
    setError,
  } = useContext(TodosContext);
  const [todoTitle, setTodoTitle] = useState('');
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const addTodo = async (todo: Omit<Todo, 'id'>) => {
    setError(ErrorStatus.none);
    setIsInputDisabled(true);

    try {
      const response = await postTodos(todo);

      setTodos([
        ...todos,
        response,
      ]);
    } catch {
      setError(ErrorStatus.add);
    }

    setTempTodo(null);
    setIsInputDisabled(false);
  };

  const handleAdding = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newTodo = {
      completed: false,
      userId: 9968,
      title: todoTitle,
    };

    addTodo(newTodo);

    setTempTodo({
      id: 0,
      ...newTodo,
    });

    setTodoTitle('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  return (

    <header className="header">
      <h1>todos</h1>

      <form
        onSubmit={handleAdding}
      >
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          disabled={isInputDisabled}
          onChange={handleChange}
        />
      </form>
    </header>

  );
};
