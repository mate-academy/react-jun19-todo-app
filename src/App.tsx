/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useContext, useEffect } from 'react';

import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { TempTodo } from './components/TempTodo/TempTodo';
import { Footer } from './components/Footer/Fotter';
import { Error } from './components/Error/Errors';
import { filterTodos } from './components/Helpers/Helpers';
import { TodosContext } from './Contexts/TodosContext/TodosContext';
import { ErrorContext } from './Contexts/ErrorContext/ErrorContext';

import { Todo } from './types/Todo';
import { TodoStatus } from './types/Status';

export const App: React.FC = () => {
  const { todos, getLocalStorageData } = useContext(TodosContext);
  const { setErrorMessage } = useContext(ErrorContext);
  const [status, setStatus] = useState<TodoStatus>(TodoStatus.all);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const noTodos = todos.length === 0;
  const filteredTodos = filterTodos(todos, status);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getLocalStorageData();
      } catch {
        setErrorMessage('Unable to load todos');
      }
    };

    fetchData();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header updateTempTodo={setTempTodo} />

        <TodoList filteredTodos={filteredTodos} />

        {tempTodo && <TempTodo todo={tempTodo} />}

        {!noTodos && (
          <Footer
            status={status}
            onStatusChange={(value: TodoStatus) => setStatus(value)}
          />
        )}
      </div>

      <Error />
    </div>
  );
};
