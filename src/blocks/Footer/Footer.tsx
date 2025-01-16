import { useContext } from 'react';
import { ClearCompletedButton } from '../../components/ClearCompetedButtom';
import { Filter } from '../../components/Filter';
import { StateContext } from '../../context/GlobalProvider';

export const Footer: React.FC = () => {
  const { todos } = useContext(StateContext);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <Filter />
      <ClearCompletedButton />
    </footer>
  );
};
