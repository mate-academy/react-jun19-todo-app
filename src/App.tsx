/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { TodoApp } from './components/TodoApp';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<TodoApp />} />
        <Route path="/active" element={<TodoApp />} />
        <Route path="/completed" element={<TodoApp />} />
      </Route>
      <Route path="*" element={(<Navigate to="/" />)} />
    </Routes>
  );
};
