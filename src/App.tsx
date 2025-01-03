/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { FilterTypes } from './types/FilterType';
import Header from './Components/Header';
import TodoList from './Components/TodoList';
import Footer from './Components/Footer';
import { useTodoContext } from './Context/TodoProvider';

export const App: React.FC = () => {
  const { todoItems } = useTodoContext();
  const [todosToShow, setTodosToShow] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<FilterTypes>(
    FilterTypes.ALL,
  );

  useEffect(() => {
    setTodosToShow(
      todoItems.filter(todo => {
        switch (selectedFilter) {
          case FilterTypes.ACTIVE:
            return !todo.completed;
          case FilterTypes.COMPLETED:
            return todo.completed;
          default:
            return true;
        }
      }),
    );
  }, [todoItems, selectedFilter]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todosToShow={todosToShow} />
        {todoItems.length > 0 && (
          <Footer
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        )}
      </div>
    </div>
  );
};
