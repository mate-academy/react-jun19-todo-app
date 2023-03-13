import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import classNames from 'classnames';

import { Header } from '../Header';
import { Footer } from '../Footer';
import { UserWarning } from '../UserWarning';
import { TodoList } from '../TodoList';
import { Error } from '../Error';

import { Todo } from '../../types/Todo';
import { getTodos, toogleTodo, deleteTodo } from '../../api/todos';
import { useLocalStorage } from '../../utils/useLocalStorage';
import { User } from '../../types/User';
import { warningTimer } from '../../utils/warningTimer';

export const TodoApp: React.FC = () => {
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  const [todos, setTodos] = useState<Todo[]>(JSON.parse(
    localStorage.getItem('todos')!,
  ) || []);
  const [error, setError] = useState(false);
  const [user, setUser] = useLocalStorage<User>('user', {
    id: 0,
    name: '',
    username: '',
    email: '',
    phone: '',
  });
  const { id } = user;

  const activeTodos = todos.filter(({ completed }) => !completed);
  const allCompleted = todos.filter(({ completed }) => completed);
  const isAllCompleted = allCompleted.length === todos.length;

  const clearCompleted = useCallback(() => {
    try {
      Promise.all(allCompleted.map(async todo => {
        return deleteTodo(id, todo.id);
      }));

      setTodos(currentTodos => {
        return currentTodos.filter(({ completed }) => !completed);
      });
    } catch {
      setError(true);
      warningTimer(setError, false, 3000);
    }
  }, [todos]);

  const onToogleAllTodos = useCallback(() => {
    try {
      Promise.all(todos.map(async todo => {
        return toogleTodo(id, todo.id, !isAllCompleted);
      }));

      setTodos(currentTodos => currentTodos.map((todo) => ({
        ...todo,
        completed: !isAllCompleted,
      })));
    } catch {
      setError(true);
      warningTimer(setError, false, 3000);
    }
  }, [todos]);

  useEffect(() => {
    (async () => {
      try {
        const todosData = await getTodos(id);

        setTodos(todosData);
      } catch {
        setError(true);
        warningTimer(setError, false, 3000);
      }
    })();
  }, [id]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  if (error) {
    return <Error />;
  }

  if (!id) {
    return (
      <UserWarning
        user={user}
        setUser={setUser}
        setError={setError}
      />
    );
  }

  return (
    <div className="todoapp">
      <Header onAddTodo={setTodos} setError={setError} />

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          checked={isAllCompleted}
          onChange={onToogleAllTodos}
        />
        <label
          htmlFor="toggle-all"
          className={classNames(
            { 'toggle-all-label': isAllCompleted },
          )}

        >
          Mark all as complete
        </label>

        <TodoList
          todos={todos}
          setTodos={setTodos}
          setError={setError}
        />
      </section>

      <Footer
        onClearCompleted={clearCompleted}
        activeTodos={activeTodos}
        allCompleted={allCompleted}
      />
    </div>
  );
};
