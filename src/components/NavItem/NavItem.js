import './NavItem.css';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { usePopups, popupActions } from '../../contexts/PopupContext';
import { useLocation } from 'react-router';

const NavItem = ({ path = '/', hasBubble, text, isLarge, minWidth, children, signinButton, signoutButton, noDecoration, alignSelf }) => {
  const { signOut } = useAuth();
  const [, popupDispatch] = usePopups();
  const isSavedArticles = useLocation().pathname === '/saved-articles';
  let navItemClassname = `navbar__text ${isSavedArticles ? 'navbar__text_dark' : ''}`;
  if (hasBubble) navItemClassname += ` navbar__text_with-bubble`;
  if (isLarge) navItemClassname += ` navbar__text_with-large-bubble`;
  const activeClassName = noDecoration || hasBubble ? 'navbar__link' : `navbar__link navbar__link_active_${isSavedArticles ? 'dark' : 'light'}`;

  const handleClick = (e) => {
    signinButton && popupDispatch(popupActions.openSignInPopup);
    signoutButton && signOut();
    popupDispatch(popupActions.closeUserMenu);
  };

  return (
    <>
      <li onClick={handleClick} className={navItemClassname}>
        <NavLink
          style={{ minWidth: minWidth, alignSelf: alignSelf }}
          className={({ isActive }) => (isActive ? activeClassName : 'navbar__link')}
          to={path}
        >
          {text}
          {children}
        </NavLink>
      </li>
    </>
  );
};

export default NavItem;
