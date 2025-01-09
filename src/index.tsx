import { createRoot } from 'react-dom/client';

import './styles/index.css';
import './styles/todo-list.scss';
import './styles/filters.scss';
import './styles/todoapp.scss';

import { App } from './components/App';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(<App />);
