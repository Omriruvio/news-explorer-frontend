import { NavLink } from 'react-router-dom';
import Hamburger from '../Hamburger/Hamburger';
import useWindowSize from '../../utils/hooks/UseWindowSize';
import './Navbar.css';
import NavItem from '../NavItem/NavItem';

const Navbar = ({ isDark }) => {
  const { width } = useWindowSize();

  const isMobileSized = width < 650;
  const activeClassName = `navbar__link navbar__link_active_${isDark ? 'dark' : 'light'}`;

  return isMobileSized ? (
    <Hamburger isDark={isDark} />
  ) : (
    <nav className={`navbar ${isDark ? 'navbar_dark' : ''}`}>
      <NavLink style={{ minWidth: '64px' }} className={({ isActive }) => (isActive ? activeClassName : 'navbar__link')} to="/">
        <NavItem isDark={isDark} text="Home" />
      </NavLink>
      <NavLink style={{ minWidth: '160px' }} className={({ isActive }) => (isActive ? activeClassName : 'navbar__link')} to="/saved-articles">
        <NavItem isDark={isDark} text="Saved articles" />
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? activeClassName : 'navbar__link')} to="/signin">
        <NavItem hasBubble isLarge isDark={isDark} text="Sign in"></NavItem>
      </NavLink>
      {/* <NavLink className={({ isActive }) => (isActive ? activeClassName : 'navbar__link')} to="/signin">
        <NavItem hasBubble isDark={isDark} text={'Elise'}>
          <LogoutIcon isDark={isDark} />
        </NavItem>
      </NavLink> */}
    </nav>
  );
};

export default Navbar;
