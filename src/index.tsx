import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.scss';

import { App } from './App';
import { StateProvider } from './components/StateContext';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <StateProvider>
    <App />
  </StateProvider>,
);
