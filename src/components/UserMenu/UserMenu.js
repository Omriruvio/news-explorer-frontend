import './UserMenu.css';
import NavItem from '../NavItem/NavItem';
import { usePopups } from '../../contexts/PopupContext';
import { popupActions } from '../../reducers/popupReducer';
import { useAuth } from '../../contexts/AuthContext';
import LogoutIcon from '../LogoutIcon/LogoutIcon';
import { useLocation } from 'react-router';

const UserMenu = ({ isDark }) => {
  const menuClassName = `user-menu ${isDark ? 'user-menu_dark' : ''}`;
  const [, popupDispatch] = usePopups();
  const { currentUser } = useAuth();
  const location = useLocation().pathname;
  const routeToPath = location === '/saved-articles' ? '/' : '/saved-articles';
  const displayPath = location === '/saved-articles' ? 'Home' : 'Saved Articles';

  const handleOverlayClick = (event) => {
    popupDispatch(popupActions.closeUserMenu);
  };

  return (
    <>
      <ul className={menuClassName}>
        <NavItem noDecoration isDark={isDark} text={displayPath} path={routeToPath} />
        {currentUser.isLoggedIn ? (
          <>
            <NavItem signoutButton hasBubble isLarge isDark={isDark} text={currentUser.name}>
              <LogoutIcon styles={{ marginLeft: '1rem' }} isDark={isDark} />
            </NavItem>
          </>
        ) : (
          <NavItem signinButton noDecoration isDark={isDark} text="Sign in" hasBubble isLarge></NavItem>
        )}
      </ul>
      <div onClick={handleOverlayClick} className="user-menu__overlay"></div>
    </>
  );
};

export default UserMenu;
