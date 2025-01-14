import { createRoot } from 'react-dom/client';

// import './styles/index.css';
// import './styles/todo-list.css';
// import './styles/filters.css';

import './styles/index.scss';

import { App } from './App';
import { GlobalStateProvider } from './context/GlobalState';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>,
);
