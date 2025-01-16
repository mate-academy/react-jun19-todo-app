import { createRoot } from 'react-dom/client';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { App } from './App';
import { TodoProvider } from './store/TodoContext';
import { FilteredTodoProvider } from './store/FilterdTodoContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodoProvider>
    <FilteredTodoProvider>
      <App />
    </FilteredTodoProvider>
  </TodoProvider>,
);
