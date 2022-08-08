import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { TodoApp } from './components/TodoApp';

export const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<TodoApp />} />
    <Route path="/active" element={<TodoApp />} />
    <Route path="/completed" element={<TodoApp />} />
  </Routes>
);
