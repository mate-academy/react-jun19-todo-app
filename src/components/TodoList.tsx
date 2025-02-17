import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { StateContext } from '../context/TodosContext';

export const TodoList: React.FC = () => {
  const { visibleTodos } = useContext(StateContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}

      {/*/!* This todo is being edited *!/*/}
      {/*<div data-cy="Todo" className="todo">*/}
      {/*  <label className="todo__status-label">*/}
      {/*    <input*/}
      {/*      data-cy="TodoStatus"*/}
      {/*      type="checkbox"*/}
      {/*      className="todo__status"*/}
      {/*    />*/}
      {/*  </label>*/}

      {/*  /!* This form is shown instead of the title and remove button *!/*/}
      {/*  <form>*/}
      {/*    <input*/}
      {/*      data-cy="TodoTitleField"*/}
      {/*      type="text"*/}
      {/*      className="todo__title-field"*/}
      {/*      placeholder="Empty todo will be deleted"*/}
      {/*      value="Todo is being edited now"*/}
      {/*    />*/}
      {/*  </form>*/}
      {/*</div>*/}
    </section>
  );
};
