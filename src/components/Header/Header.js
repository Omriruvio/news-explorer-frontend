import './Header.css';
import Logo from '../Logo/Logo';
import Navbar from '../Navbar/Navbar';
import DecoratorLine from '../DecoratorLine/DecoratorLine';
import { usePopups } from '../../contexts/PopupContext';
import useWindowSize from '../../hooks/UseWindowSize';
import { useEffect } from 'react';
import { useState } from 'react';

const Header = ({ isDark }) => {
  const [popupState, popupDispatch] = usePopups();
  const [headerClassName, setHeaderClassName] = useState('header');
  const isMobileSized = useWindowSize().width < 650;

  useEffect(() => {
    if (isMobileSized && !isDark) {
      setHeaderClassName(`header ${popupState.isUserMenuOpen ? 'header_dark' : ''}`);
    } else {
      setHeaderClassName('header');
    }
  }, [isMobileSized, popupState.isUserMenuOpen, isDark]);
  // const headerClassName = `header ${popupState.isUserMenuOpen ? 'header_dark' : ''}`;

  return (
    <>
      <div className={headerClassName}>
        <Logo isDark={isDark} />
        <Navbar isDark={isDark} />
      </div>
      <DecoratorLine isDark={isDark} />
    </>
  );
};

export default Header;
