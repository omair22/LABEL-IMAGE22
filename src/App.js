import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard_admin from './Dashboard_admin';
import store from './store';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard_admin" element={<Dashboard_admin />} />
        <Route path="/store" element={<store />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;