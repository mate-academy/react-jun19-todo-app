import React, { FormEvent, useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { useTodos } from './context/TodoContext';

export const App: React.FC = () => {
  const { todos, setTodos } = useTodos();
  const [todo, setTodo] = useState<string>('');
  const [filter, setFilter] = useState<FilterType>(FilterType.All);
  const [changeTodoId, setChangeTodoId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState<string>('');

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, [setTodos]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!todo.trim()) {
      return;
    }

    const newTodo = {
      id: +new Date(),
      title: todo.trim(),
      completed: false,
    };

    setTodos(prev => [...prev, newTodo]);
    setTodo('');
  };

  const deleteTodoHandler = (todoId: number) => {
    setTodos(prevTodos => prevTodos.filter(t => t.id !== todoId));
  };

  const updateCompleted = (todoItem: Todo) => {
    setTodos(prevTodos =>
      prevTodos.map(t =>
        t.id === todoItem.id ? { ...t, completed: !t.completed } : t,
      ),
    );
  };

  const handleBlur = (todoItem: Todo) => {
    const { id, title } = todoItem;

    if (newTitle.trim() === title) {
      setChangeTodoId(null);

      return;
    }

    if (newTitle.trim() === '') {
      deleteTodoHandler(todoItem.id);
      setChangeTodoId(null);

      return;
    }

    setTodos(prevTodos =>
      prevTodos.map(t => (t.id === id ? { ...t, title: newTitle.trim() } : t)),
    );

    setChangeTodoId(null);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setChangeTodoId(null);
    }
  };

  const handleDoubleClick = (todoItem: Todo) => {
    setNewTitle(todoItem.title);
    setChangeTodoId(todoItem.id);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          addTodo={addTodo}
          todo={todo}
          setTodo={setTodo}
          changeTodoId={changeTodoId}
          updateCompleted={updateCompleted}
        />
        <TodoList
          filter={filter}
          updateCompleted={updateCompleted}
          changeTodoId={changeTodoId}
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          handleKeyUp={handleKeyUp}
          handleDoubleClick={handleDoubleClick}
          handleBlur={handleBlur}
          deleteTodoHandler={deleteTodoHandler}
        />
        {todos.length > 0 && (
          <Footer
            filter={filter}
            setFilter={setFilter}
            deleteTodoHandler={deleteTodoHandler}
          />
        )}
      </div>
    </div>
  );
};
