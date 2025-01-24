import { createRoot } from 'react-dom/client';

import './styles/index.scss';

import { App } from './App';
import { Provider } from './Provider';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <Provider>
    <App />
  </Provider>,
);
