import { createRoot } from 'react-dom/client';

import './styles/index.scss';
import './styles/todoapp.scss';
import './styles/filter.scss';
import './styles/todo.scss';

import { App } from './App';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(<App />);
