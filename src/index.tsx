import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.scss';

import { App } from './App';
import { TodosDeveloper } from './GlobalData/TodosDeveloper';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <TodosDeveloper>
    <App />
  </TodosDeveloper>,
);
