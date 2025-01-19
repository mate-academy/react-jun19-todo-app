import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import { App } from './App';
import { GloabalStateProvider } from './Store';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GloabalStateProvider>
    <App />
  </GloabalStateProvider>,
);
