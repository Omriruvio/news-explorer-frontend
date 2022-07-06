import './NavItem.css';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { usePopups } from '../../contexts/PopupContext';
import { popupActions } from '../../reducers/popupReducer';

const NavItem = ({ path = '/', isDark, hasBubble, text, isLarge, minWidth, children, signinButton, signoutButton, noDecoration, alignSelf }) => {
  let navItemClassname = `navbar__text ${isDark ? 'navbar__text_dark' : ''}`;
  if (hasBubble) navItemClassname += ` navbar__text_with-bubble`;
  if (isLarge) navItemClassname += ` navbar__text_with-large-bubble`;
  const { signIn, signOut } = useAuth();
  const [popupState, popupDispatch] = usePopups();
  const activeClassName = noDecoration || hasBubble ? 'navbar__link' : `navbar__link navbar__link_active_${isDark ? 'dark' : 'light'}`;

  const handleClick = (e) => {
    signinButton && signIn('Elise');
    signoutButton && signOut();
    popupDispatch(popupActions.closeAll);
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
