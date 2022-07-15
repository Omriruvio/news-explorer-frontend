import './UserMenu.css';
import NavItem from '../NavItem/NavItem';
import { usePopups, popupActions } from '../../contexts/PopupContext';
import { useInfo } from '../../contexts/UserContext';
import { useLocation } from 'react-router';
import SignInButton from '../SignInButton/SignInButton';
import SignOutButton from '../SignOutButton/SignOutButton';

const UserMenu = () => {
  const [, popupDispatch] = usePopups();
  const { currentUser } = useInfo();
  const isSavedArticles = useLocation().pathname === '/saved-articles';
  const routeToPath = isSavedArticles ? '/' : '/saved-articles';
  const displayPath = isSavedArticles ? 'Home' : 'Saved Articles';

  const handleOverlayClick = () => {
    popupDispatch(popupActions.closeUserMenu);
  };

  return (
    <>
      <ul className='user-menu'>
        <NavItem noDecoration text={displayPath} path={routeToPath} />
        {currentUser.isLoggedIn ? <SignOutButton inUserMenu /> : <SignInButton inUserMenu />}
      </ul>
      <div onClick={handleOverlayClick} className='user-menu__overlay'></div>
    </>
  );
};

export default UserMenu;
