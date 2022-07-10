import './UserMenu.css';
import NavItem from '../NavItem/NavItem';
import { usePopups, popupActions } from '../../contexts/PopupContext';
import { useAuth } from '../../contexts/AuthContext';
import LogoutIcon from '../LogoutIcon/LogoutIcon';
import { useLocation } from 'react-router';

const UserMenu = () => {
  const [, popupDispatch] = usePopups();
  const { currentUser } = useAuth();
  const isSavedArticles = useLocation().pathname === '/saved-articles';
  const routeToPath = isSavedArticles ? '/' : '/saved-articles';
  const displayPath = isSavedArticles ? 'Home' : 'Saved Articles';

  const handleOverlayClick = () => {
    popupDispatch(popupActions.closeUserMenu);
  };

  return (
    <>
      <ul className="user-menu">
        <NavItem noDecoration text={displayPath} path={routeToPath} />
        {currentUser.isLoggedIn ? (
          <NavItem signoutButton hasBubble isLarge text={currentUser.name}>
            <LogoutIcon styles={{ marginLeft: '1rem' }} />
          </NavItem>
        ) : (
          !isSavedArticles && <NavItem signinButton noDecoration text="Sign in" hasBubble isLarge></NavItem>
        )}
      </ul>
      <div onClick={handleOverlayClick} className="user-menu__overlay"></div>
    </>
  );
};

export default UserMenu;
