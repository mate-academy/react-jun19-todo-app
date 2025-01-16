import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import { App } from './App';
import { LocalStorageProvider } from './context/context';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <LocalStorageProvider>
    <App />
  </LocalStorageProvider>,
);
