import { createRoot } from 'react-dom/client';
import './styles/index.scss';
import { App } from './App';
import React from 'react';
import { GlobalStateProvider } from './components/Store';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>,
);
