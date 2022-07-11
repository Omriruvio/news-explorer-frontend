import './NavItems.css';
import NavItem from '../NavItem/NavItem';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'react-router';
import SignInButton from '../SignInButton/SignInButton';
import SignOutButton from '../SignOutButton/SignOutButton';

const NavItems = () => {
  const { currentUser } = useAuth();
  const isSavedArticles = useLocation().pathname === '/saved-articles';
  return (
    <nav className={`navbar ${isSavedArticles ? 'navbar_dark' : ''}`}>
      <ul className="navbar__list">
        <NavItem text="Home" path="/" minWidth="64px" />
        <NavItem text="Saved articles" path="/saved-articles" minWidth="160px" />
        {currentUser.isLoggedIn ? <SignOutButton userName={currentUser.name} /> : !isSavedArticles ? <SignInButton /> : <></>}
      </ul>
    </nav>
  );
};

export default NavItems;
