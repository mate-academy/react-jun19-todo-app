import { useState, useContext } from 'react';
import { DispatchContex, TodosContext } from './TodosContext';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';
import { ToDo } from '../types/todo';

export const TodoApp: React.FC = () => {
  const dispatch = useContext(DispatchContex);
  const todos = useContext(TodosContext);
  const todoList = todos.todos;

  const [value, setValue] = useState('');
  const trimedValue = value.trim();

  const addNewToDo = (event: React.FormEvent) => {
    event.preventDefault();

    if (trimedValue === '') {
      return;
    }

    const newTodo = {
      id: +new Date(),
      title: trimedValue,
      completed: false,
    };

    if (todoList.length > 0) {
      todoList.push(newTodo);
      dispatch({ type: 'add', payload: todoList });
    } else {
      dispatch({ type: 'add', payload: [newTodo] });
    }

    setValue('');
  };

  const toggleAll = () => {
    let toggleTodos = todoList;

    if (todoList.find(todo => todo.completed === false)) {
      toggleTodos = todoList.map(todo => {
        return {
          ...todo,
          completed: true,
        };
      });
    } else {
      toggleTodos = todoList.map(todo => {
        return {
          ...todo,
          completed: false,
        };
      });
    }

    dispatch({ type: 'toggleAll', payload: toggleTodos });
  };

  const clearAllCompleted = () => {
    const clearCompleted = todoList.filter(todo => !todo.completed);

    dispatch({ type: 'clearAllCompleted', payload: clearCompleted });
  };

  const todoLeft = () => {
    if (todoList) {
      return todoList.filter((todo: ToDo) => !todo.completed).length;
    }

    return [];
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={addNewToDo} method="POST">
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={value}
            onChange={event => setValue(event.target.value)}
            onBlur={addNewToDo}
          />
        </form>
      </header>

      {(todoList.length > 0)
        && (
          <>
            <section className="main">
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                data-cy="toggleAll"
                onClick={toggleAll}
              />
              <label htmlFor="toggle-all">Mark all as complete</label>

              <TodoList items={todos} />

            </section>

            <footer className="footer">
              <span className="todo-count" data-cy="todosCounter">
                {`${todoLeft()} items left`}
              </span>

              <TodosFilter />

              {todoList.find((todo: ToDo) => todo.completed)
                && (
                  <button
                    type="button"
                    className="clear-completed"
                    onClick={clearAllCompleted}
                  >
                    Clear completed
                  </button>
                )}
            </footer>
          </>
        )}
    </div>
  );
};
