import React, { useContext, useEffect, useMemo, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { StateContext } from '../../Store';

import { TodoItem } from '../TodoItem/TodoItem';
import { Filter } from '../../types/Filter';

export const TodoList = () => {
  const [first, setFirst] = useState(true);
  const { todos, filter } = useContext(StateContext);

  useEffect(() => {
    setFirst(false);
  }, []);

  const filteredTodos = useMemo(() => {
    if (first) {
      return [];
    }

    switch (filter) {
      case Filter.all:
        return todos;
      case Filter.active:
        return todos.filter(todo => !todo.completed);
      case Filter.completed:
        return todos.filter(todo => todo.completed);
    }
  }, [filter, todos, first]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TransitionGroup>
        {filteredTodos.map(todo => {
          const nodeRef = React.createRef<HTMLDivElement>();

          return (
            <CSSTransition
              nodeRef={nodeRef}
              key={todo.id}
              timeout={1000}
              classNames="item"
            >
              <TodoItem todo={todo} nodeRef={nodeRef} />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </section>
  );
};
