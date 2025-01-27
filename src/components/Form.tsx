import React, { useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext, StateContext } from '../Store';
import { Actions, Todo } from '../types/Todo';

const Form: React.FC = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const { allTodos } = React.useContext(StateContext);

  const { renamingTodo } = React.useContext(StateContext);

  const dispatch = useContext(DispatchContext);

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current && !renamingTodo) {
      titleField.current.focus();
    }
  }, [renamingTodo, allTodos]);

  const addTodo = () => {
    const newTodo: Todo = {
      id: Date.now(),
      title: todoTitle.trim(),
      completed: false,
    };

    if (dispatch) {
      dispatch({ type: Actions.AddTodo, payload: newTodo });
    }
  };

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!todoTitle.trim()) {
      return;
    }

    addTodo();
    setTodoTitle('');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        ref={titleField}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={todoTitle}
        onChange={handleTitleInput}
      />
    </form>
  );
};

export default Form;
