/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useRef, useState, useEffect, useCallback, useContext } from 'react';
import Header from './components/Header/Header';
import Error from './components/Error/Error';
import TodoList from './components/TodoList/TodoList';
import Footer from './components/Footer/Footer';
import { StateContext } from './components/GlobalStateProvider/GlobalStateProvider';
import { getFilteredTodos } from './utils/getFilteredTodos';
import { FilterType } from './types/FilterType';

enum ErrorMessage {
  emptyTitle = 'Title should not be empty',
}

export const App: React.FC = () => {

  const { todos } = useContext(StateContext);
  const [error, setError] = useState<ErrorMessage | null>(null);
  const [todosCounter, setTodosCounter] = useState(0);
  const [filterBy, setFilterBy] = useState<FilterType>(FilterType.all);
  const inputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);


  useEffect(() => {
    const notCompletedTodos = todos.filter(todo => !todo.completed).length;
    setTodosCounter(notCompletedTodos);
  }, [todos]);


  const handleSetFilter = (filter: FilterType) => {
    setFilterBy(filter);
  };


  const handleCloseErrorMsg = useCallback(() => {
    setError(null);
  }, []);


  const filteredTodos = getFilteredTodos(todos, filterBy);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header setError={setError} error={error}/>
        <TodoList todos={filteredTodos}/>
        {todos.length > 0 && <Footer todosCounter={todosCounter} filterBy={filterBy}  handleSetFilter={handleSetFilter}/>}

      </div>
      <Error error={error}  handleCloseErrorMsg={handleCloseErrorMsg} />
    </div>
  );
};
