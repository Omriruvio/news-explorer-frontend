import './NavItem.css';
import { NavLink } from 'react-router-dom';
import { usePopups, popupActions } from '../../contexts/PopupContext';
import { useLocation } from 'react-router';

const NavItem = ({ path = '/', text, minWidth, children, signinButton, signoutButton }) => {
  const [popupState, popupDispatch] = usePopups();
  const isSavedArticles = useLocation().pathname === '/saved-articles';
  const navItemClassname = `navbar__text ${isSavedArticles ? 'navbar__text_dark' : ''}`;
  const userMenuStyle = { color: isSavedArticles && popupState.isUserMenuOpen ? 'white' : '' };
  const activeClassName = `navbar__link navbar__link_${isSavedArticles ? 'dark' : 'light'}`;

  const handleClick = (e) => {
    popupDispatch(popupActions.closeUserMenu);
  };

  return (
    <li onClick={handleClick} className={navItemClassname}>
      <NavLink style={{ minWidth: minWidth, ...userMenuStyle }} className={({ isActive }) => (isActive ? activeClassName : 'navbar__link')} to={path}>
        {text}
        {children}
      </NavLink>
    </li>
  );
};

export default NavItem;
