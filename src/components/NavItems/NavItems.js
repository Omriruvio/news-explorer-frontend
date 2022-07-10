import './NavItems.css';
import NavItem from '../NavItem/NavItem';
import LogoutIcon from '../LogoutIcon/LogoutIcon';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'react-router';

const NavItems = () => {
  const { currentUser } = useAuth();
  const isSavedArticles = useLocation().pathname === '/saved-articles';
  return (
    <nav className={`navbar ${isSavedArticles ? 'navbar_dark' : ''}`}>
      <ul className="navbar__list">
        <NavItem text="Home" path="/" minWidth="64px" />
        <NavItem text="Saved articles" path="/saved-articles" minWidth="160px" />
        {currentUser.isLoggedIn ? (
          <NavItem signoutButton hasBubble text={currentUser.name}>
            <LogoutIcon styles={{ marginLeft: '1rem' }} />
          </NavItem>
        ) : !isSavedArticles ? (
          <NavItem signinButton hasBubble isLarge text="Sign in" />
        ) : (
          <></>
        )}
      </ul>
    </nav>
  );
};

export default NavItems;
