/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useContext, useEffect, useRef } from 'react';
import cn from 'classnames';
import { DispatchContext, StateContext } from './Strore';
import { Filter } from './types/Filter';
import { TodoItem } from './Components/TodoItem';
import { Todo } from './types/Todo';
import { TodoFilter } from './Components/TodoFilter';

export const App: React.FC = () => {
  const { todos, inputValue, filterStatus } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const inputElement = useRef<HTMLInputElement>(null);

  const filteredTodos = todos.filter(todo => {
    const { completed } = todo;

    switch (filterStatus) {
      case Filter.Active:
        return !completed;

      case Filter.Completed:
        return completed;

      default:
        return todo;
    }
  });

  const completedTodos = todos.filter(todo => todo.completed);

  const activeTodos = todos.filter(todo => !todo.completed);

  const allCompleted = completedTodos.length === todos.length;

  const setInputValue = (value: string) => {
    dispatch({ type: 'setInputValue', payload: value });
  };

  const setTodo = (value: Todo) => {
    dispatch({ type: 'setTodo', payload: value });
  };

  const setTodos = useCallback(
    (value: Todo[]) => {
      dispatch({ type: 'setTodos', payload: value });
    },
    [dispatch],
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setInputValue(value);
  };

  const handlePostTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const preparedInputValue = inputValue.trim();

    if (!preparedInputValue.length) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: preparedInputValue,
      completed: false,
    };

    setTodo(newTodo);
    setInputValue('');
  };

  const handleDeleteAllCompleted = () => {
    setTodos(activeTodos);
    inputElement.current?.focus();
  };

  const handleToggleAll = () => {
    let preparedArray;

    if (allCompleted) {
      preparedArray = todos.map(todo => ({
        ...todo,
        completed: false,
      }));
    } else {
      preparedArray = todos.map(todo => {
        if (!todo.completed) {
          return {
            ...todo,
            completed: true,
          };
        }

        return todo;
      });
    }

    setTodos(preparedArray);
    inputElement.current?.focus();
  };

  useEffect(() => {
    const todosFromStorage = localStorage.getItem('todos')
      ? JSON.parse(localStorage.getItem('todos') as string)
      : [];

    setTodos(todosFromStorage);

    inputElement.current?.focus();
  }, [setTodos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {!!todos.length && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', {
                active: allCompleted,
              })}
              data-cy="ToggleAllButton"
              onClick={handleToggleAll}
            />
          )}
          <form onSubmit={handlePostTodo}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={handleInputChange}
              ref={inputElement}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} inputElement={inputElement} />
          ))}
        </section>

        {!!todos.length && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${activeTodos.length} items left`}
            </span>

            <TodoFilter />

            <button
              disabled={!completedTodos.length}
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={handleDeleteAllCompleted}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};
