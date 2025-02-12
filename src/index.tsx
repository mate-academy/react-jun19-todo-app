import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import './styles/index.scss';

import { App } from './App';

import { TodoProvider } from './context/TodoContext';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <TodoProvider>
    <App />
  </TodoProvider>,
);
