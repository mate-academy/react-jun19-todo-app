import { createRoot } from 'react-dom/client';

import './styles/filters.css';
import './styles/index.css';
import './styles/todo-list.css';

import { App } from './App';
import { TodoContextProvider } from './context/TodoContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodoContextProvider>
    <App />
  </TodoContextProvider>,
);
