import './NavItems.css';
import NavItem from '../NavItem/NavItem';
import LogoutIcon from '../LogoutIcon/LogoutIcon';
import { useAuth } from '../../contexts/AuthContext';

const NavItems = ({ isDark }) => {
  const { currentUser } = useAuth();
  return (
    <nav className={`navbar ${isDark ? 'navbar_dark' : ''}`}>
      <ul className="navbar__list">
        <NavItem isDark={isDark} text="Home" path="/" minWidth="64px" />
        <NavItem isDark={isDark} text="Saved articles" path="/saved-articles" minWidth="160px" />
        {currentUser.isLoggedIn ? (
          <NavItem signoutButton hasBubble isDark={isDark} text={currentUser.name}>
            <LogoutIcon isDark={isDark} />
          </NavItem>
        ) : (
          <NavItem signinButton hasBubble isLarge isDark={isDark} text="Sign in" />
        )}
      </ul>
    </nav>
  );
};

export default NavItems;

/* <NavLink style={{ minWidth: '64px' }} className={({ isActive }) => (isActive ? activeClassName : 'navbar__link')} to="/">
        <NavItem isDark={isDark} text="Home" />
      </NavLink> */

// <NavLink style={{ minWidth: '160px' }} className={({ isActive }) => (isActive ? activeClassName : 'navbar__link')} to="/saved-articles">
//   <NavItem isDark={isDark} text="Saved articles" />
// </NavLink>;

// <NavLink className={({ isActive }) => (isActive ? activeClassName : 'navbar__link')} to="/signin">
//   <NavItem hasBubble isLarge isDark={isDark} text="Sign in"></NavItem>
// </NavLink>;

/* <NavLink className={({ isActive }) => (isActive ? activeClassName : 'navbar__link')} to="/signin">
        <NavItem hasBubble isDark={isDark} text={'Elise'}>
          <LogoutIcon isDark={isDark} />
        </NavItem>
      </NavLink> */
