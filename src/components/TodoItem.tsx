import {
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { TodoContext } from '../context/TodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [query, setQuery] = useState(todo.title);
  const editingInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingInput.current) {
      editingInput.current.focus();
    }
  }, [isEditing]);

  const deleteTodofromStorage = (todoId: number) => {
    const updatedTodos = todos.filter(currentTodo => currentTodo.id !== todoId);

    setTodos(updatedTodos);
  };

  const updateTitle = (id: number, newTitle: string) => {
    const updatedTodos = todos.map(currentTodo => {
      if (currentTodo.id === id) {
        return {
          ...currentTodo,
          title: newTitle,
        };
      }

      return currentTodo;
    });

    setTodos(updatedTodos);
  };

  const submitUpdateTitle = (event: React.FormEvent) => {
    event.preventDefault();

    if (query && query !== todo.title) {
      updateTitle(todo.id, query);
      setIsEditing(false);
    }

    if (!query?.length) {
      deleteTodofromStorage(todo.id);
    }

    setIsEditing(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setQuery(todo.title);
      setIsEditing(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map(currentTodo => {
      if (currentTodo.id === id) {
        return {
          ...currentTodo,
          completed: !todo.completed,
        };
      }

      return currentTodo;
    });

    setTodos(updatedTodos);
  };

  return (
    <li
      className={classNames({
        editing: isEditing,
        completed: todo.completed,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        <label onDoubleClick={() => setIsEditing(true)}>
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="deleteButton"
          onClick={() => deleteTodofromStorage(todo.id)}
        />
      </div>

      <form onSubmit={submitUpdateTitle}>
        <input
          type="text"
          value={query || ''}
          ref={editingInput}
          onBlur={submitUpdateTitle}
          onKeyUp={handleKeyUp}
          onChange={handleInputChange}
          className="edit"
        />
      </form>
    </li>
  );
};
