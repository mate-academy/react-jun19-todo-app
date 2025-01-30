/* eslint-disable jsx-a11y/control-has-associated-label */
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { TodoProvider } from './context/TodoContext';

export const App: React.FC = () => {
  return (
    <TodoProvider>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <TodoHeader />
          <TodoList />
          <TodoFooter />
        </div>
      </div>
    </TodoProvider>
  );
};
