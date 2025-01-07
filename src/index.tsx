import { createRoot } from 'react-dom/client';

import './styles/index.css';
import './styles/todo.scss';
import './styles/filters.scss';

import { App } from './App';
import { AppProvider } from './context/AppProvider';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <AppProvider>
    <App />
  </AppProvider>,
);
