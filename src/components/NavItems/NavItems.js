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
            <LogoutIcon styles={{ marginLeft: '1rem' }} isDark={isDark} />
          </NavItem>
        ) : (
          <NavItem signinButton hasBubble isLarge isDark={isDark} text="Sign in" />
        )}
      </ul>
    </nav>
  );
};

export default NavItems;
