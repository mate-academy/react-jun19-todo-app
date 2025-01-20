import { useContext, useEffect, useRef } from 'react';
import { Filter } from '../../types/Filter';
import { TodosContext } from '../../TodoContext/TodoContext';
import { TodoItem } from '../TodoItem/todoItem';

type Props = {
  filterStatus: Filter;
  editTodoId: number | null;
  editingValue: string;
  setEditingValue: (value: string) => void;
  onTodoStatusChange: (id: number) => void;
  onTodoDelete: (id: number) => void;
  onTodoDoubleClick: (id: number) => void;
  onEditTitleBlur: () => void;
  onEditTitleKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const TodoList: React.FC<Props> = ({
  filterStatus,
  editTodoId,
  editingValue,
  setEditingValue,
  onTodoStatusChange,
  onTodoDelete,
  onTodoDoubleClick,
  onEditTitleBlur,
  onEditTitleKeyUp,
}) => {
  const { todos } = useContext(TodosContext);
  const editingField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingField.current) {
      editingField.current.focus();
    }
  }, [editTodoId]);

  const filteredTodos = todos.filter(todo => {
    switch (filterStatus) {
      case Filter.Active:
        return !todo.completed;
      case Filter.Completed:
        return todo.completed;
      case Filter.All:
      default:
        return true;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todoId={todo.id}
          isEditing={editTodoId === todo.id}
          editingValue={editingValue}
          setEditingValue={setEditingValue}
          onTodoStatusChange={onTodoStatusChange}
          onTodoDelete={onTodoDelete}
          onTodoDoubleClick={onTodoDoubleClick}
          onEditTitleBlur={onEditTitleBlur}
          onEditTitleKeyUp={onEditTitleKeyUp}
          editingField={editingField}
        />
      ))}
    </section>
  );
};
