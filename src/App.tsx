import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { useTodo } from './TodoContex';

export const App = () => {
  const { todos } = useTodo();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <Header />
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          <TodoList />
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <Footer />
          </footer>
        )}
      </div>
    </div>
  );
};
