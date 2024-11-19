import { createRoot } from 'react-dom/client';

import './styles/index.scss';
import './styles/todo.scss';
import './styles/todoapp.scss';
import './styles/filter.scss';

import { App } from './App';
import { TodoContextProvider } from './context/TodoContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodoContextProvider>
    <App />
  </TodoContextProvider>,
);
