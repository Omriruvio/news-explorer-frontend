import './NavItem.css';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const NavItem = ({ path = '/', isDark, hasBubble, text, isLarge, minWidth, children, signinButton, signoutButton }) => {
  let navItemClassname = `navbar__text ${isDark ? 'navbar__text_dark' : ''}`;
  if (hasBubble) navItemClassname += ` navbar__text_with-bubble`;
  if (isLarge) navItemClassname += ` navbar__text_with-large-bubble`;
  const { signIn, signOut } = useAuth();

  const handleClick = (e) => {
    signinButton ? signIn('Elise') : signOut();
  };
  const activeClassName = hasBubble ? 'navbar__link' : `navbar__link navbar__link_active_${isDark ? 'dark' : 'light'}`;
  return (
    <NavLink style={{ minWidth: minWidth }} className={({ isActive }) => (isActive ? activeClassName : 'navbar__link')} to={path}>
      <li onClick={handleClick} className={navItemClassname}>
        {text}
        {children}
      </li>
    </NavLink>
  );
};

export default NavItem;
