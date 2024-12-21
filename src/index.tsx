import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.scss';

import Providers from './Providers/Providers';
import { App } from './App';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Providers>
    <App />
  </Providers>,
);
