import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import { App } from './App';
import { GlobalstateProvider } from './Storage/storageFiles';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GlobalstateProvider>
    <App />
  </GlobalstateProvider>,
);
