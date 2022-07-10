import './Header.css';
import Logo from '../Logo/Logo';
import Navbar from '../Navbar/Navbar';
import { usePopups } from '../../contexts/PopupContext';
import useWindowSize from '../../hooks/UseWindowSize';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router';

const Header = () => {
  const [popupState] = usePopups();
  const [headerClassName, setHeaderClassName] = useState('header');
  const isMobileSized = useWindowSize().width < 650;
  const isSavedArticles = useLocation().pathname === '/saved-articles';

  useEffect(() => {
    if (isMobileSized && !isSavedArticles) {
      setHeaderClassName(`header ${popupState.isUserMenuOpen ? 'header_dark' : ''}`);
    } else {
      setHeaderClassName('header');
    }
  }, [isMobileSized, popupState.isUserMenuOpen, isSavedArticles]);

  return (
    <div className={headerClassName}>
      <Logo />
      <Navbar />
    </div>
  );
};

export default Header;
