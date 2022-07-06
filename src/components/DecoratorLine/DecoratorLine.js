import { useEffect, useState } from 'react';
import { usePopups } from '../../contexts/PopupContext';
import './DecoratorLine.css';

const DecoratorLine = ({ isDark }) => {
  const [popupState] = usePopups();
  const [decoratorClassname, setDecoratorClassName] = useState('header__decorator');
  useEffect(() => {
    if (isDark) {
      setDecoratorClassName('header__decorator header__decorator_dark');
    } else {
      setDecoratorClassName('header__decorator');
    }
  }, [isDark, popupState.isUserMenuOpen]);

  return <div className={decoratorClassname}></div>;
};

export default DecoratorLine;
