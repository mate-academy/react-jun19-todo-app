import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import { App } from './App';
import { GlobalProvider } from './GlobalProvider/GlobalProvider';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
);
