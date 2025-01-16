import { useContext } from 'react';
import { Form } from '../../components/Form';
import { ToggleAllButton } from '../../components/ToggleAllButton';
import { StateContext } from '../../context/GlobalProvider';

export const Header: React.FC = () => {
  const { todos } = useContext(StateContext);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && <ToggleAllButton />}
      <Form />
    </header>
  );
};
