import { createRoot } from 'react-dom/client';

import './styles/index.scss';
import './styles/todo.scss';
import './styles/filter.scss';

import { App } from './App';
import { GlobalStateProvider } from './components/GlobalContext/GlobalContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>,
);
