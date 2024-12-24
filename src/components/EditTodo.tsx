import React, { useContext, useEffect, useRef, useState } from 'react';
import { InputsFocusContext, TodosContext } from '../GlobalData/TodosDeveloper';
import { Todo } from '../types/Todo';
import { deleteTodo } from './Todo';

interface Props {
  todo: Todo;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditTodo: React.FC<Props> = ({ todo, setEditing }) => {
  const [value, setValue] = useState(todo.title);

  const { setTodos } = useContext(TodosContext);
  const prevValue = useRef<string | null>(null);

  const inputRefs = useContext(InputsFocusContext);

  const handleCancel = () => {
    if (prevValue.current) {
      setValue(prevValue.current);
    } else {
      setValue(todo.title);
    }

    setEditing(false);
  };

  useEffect(() => {
    prevValue.current = value;
  }, [value]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  useEffect(() => {
    if (inputRefs?.inputRef2?.current) {
      inputRefs?.inputRef2?.current.focus();
    }
  }, [inputRefs]);

  const updateContentTodo = (content: Todo) => {
    setTodos(currentTodos =>
      currentTodos.map(item =>
        item.id === content.id && item.title !== value
          ? { ...item, title: value.trim() }
          : item,
      ),
    );
  };

  const handleOnSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }

    if (value.trim().length === 0) {
      deleteTodo(todo, setTodos);
      setEditing(false);

      return;
    }

    updateContentTodo(todo);
    setEditing(false);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        ref={inputRefs && inputRefs.inputRef2}
        data-cy="TodoTitleField"
        type="text"
        className="todo__title-field"
        placeholder="Empty todo will be deleted"
        value={value}
        onChange={e => setValue(e.target.value)}
        onBlur={() => {
          handleOnSubmit();
          setEditing(false);
        }}
      />
    </form>
  );
};
