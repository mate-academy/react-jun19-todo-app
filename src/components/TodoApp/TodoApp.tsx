import React, { useContext, useState } from 'react';
import { TodoList } from '../TodoList';
import { TodosContext } from '../TodosContext';
import { Footer } from '../Footer';

export const TodoApp: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value.trim()) {
      return;
    }

    const newTodo = {
      title: value,
      id: new Date(),
      completed: false,
    };

    setTodos([newTodo, ...todos]);
    setValue('');
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={value}
            onChange={handleChange}
          />
        </form>
      </header>

      {todos.length > 0 && <TodoList />}

      {todos.length > 0 && <Footer />}
    </div>
  );
};
