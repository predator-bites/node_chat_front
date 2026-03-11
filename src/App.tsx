import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/shared/Header';

const App: React.FC = () => {
  return (
    <div className="page">
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
