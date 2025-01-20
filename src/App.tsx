import React, { useContext, useState } from 'react';

import { Filter } from './types/Filter';
import { TodosContext } from './TodoContext/TodoContext';
import { Header } from './components/Header/header';
import { Footer } from './components/Footer/footer';
import { TodoList } from './components/TodoList/todoList';

export const App: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<Filter>(Filter.All);
  const [editTodo, setEditingTodo] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState<string>('');
  const { todos, setTodos } = useContext(TodosContext);

  const handleDeleteTodo = (todoId: number) => {
    const updateTodos = todos.filter(todo => todo.id !== todoId);

    setTodos(updateTodos);
  };

  const updateTodoStatus = (todoId: number) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === todoId) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleUpdateAll = () => {
    const areSomeIncomplete = todos.some(todo => !todo.completed);

    if (areSomeIncomplete) {
      setTodos(
        todos.map(todo => ({
          ...todo,
          completed: true,
        })),
      );
    } else {
      setTodos(
        todos.map(todo => ({
          ...todo,
          completed: false,
        })),
      );
    }
  };

  const handleRanameTodo = (todoId: number) => {
    const todo = todos.find(t => t.id === todoId);

    if (todo) {
      setEditingTodo(todoId);
      setEditingValue(todo.title);
    }
  };

  const handleTodoTitleBlur = () => {
    if (editingValue.trim() === '') {
      handleDeleteTodo(editTodo as number);
    } else {
      const updatedTodos = todos.map(todo => {
        if (todo.id === editTodo) {
          return { ...todo, title: editingValue.trim() };
        }

        return todo;
      });

      setTodos(updatedTodos);
    }

    setEditingTodo(null);
    setEditingValue('');
  };

  const handleTodoTitleKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Escape') {
      setEditingTodo(null);
      setEditingValue('');
    } else if (event.key === 'Enter') {
      handleTodoTitleBlur();
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header updateAll={handleUpdateAll} />

        <TodoList
          filterStatus={filterStatus}
          editTodoId={editTodo}
          editingValue={editingValue}
          setEditingValue={setEditingValue}
          onTodoStatusChange={updateTodoStatus}
          onTodoDelete={handleDeleteTodo}
          onTodoDoubleClick={handleRanameTodo}
          onEditTitleBlur={handleTodoTitleBlur}
          onEditTitleKeyUp={handleTodoTitleKeyUp}
        />

        {todos.length !== 0 && (
          <Footer
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        )}
      </div>
    </div>
  );
};
