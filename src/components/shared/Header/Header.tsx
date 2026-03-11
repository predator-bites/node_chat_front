import type React from 'react';
import { Logo } from '../Logo/Logo';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const onClick = () => navigate('/login');

  return (
    <header className="header page__header">
      <Logo className="header__logo" onClick={onClick} />
    </header>
  );
};
