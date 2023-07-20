import { createRoot } from 'react-dom/client';
import './styles/index.scss';
import { HashRouter } from 'react-router-dom';
import { App } from './App';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <HashRouter>
      <App />
    </HashRouter>,
  );
