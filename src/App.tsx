/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useMemo } from 'react';
import { DispatchContext, StateContext } from './components/StateContext';
import { TodoFooter } from './components/TodoFooter';
import { TodoHeader } from './components/TodoHeader';
import { TodoItem } from './components/TodoItem';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const { todos, filter } = state;

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case FilterType.Active: {
        return todos.filter(todo => !todo.completed);
      }

      case FilterType.Completed: {
        return todos.filter(todo => todo.completed);
      }

      default: {
        return todos;
      }
    }
  }, [todos, filter]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader todos={todos} dispatch={dispatch} />

        {filteredTodos && (
          <section className="todoapp__main" data-cy="TodoList">
            {filteredTodos.map(todo => (
              <TodoItem todo={todo} dispatch={dispatch} key={todo.id} />
            ))}
          </section>
        )}

        {todos && todos.length > 0 && (
          <TodoFooter todos={todos} filter={filter} dispatch={dispatch} />
        )}
      </div>
    </div>
  );
};
