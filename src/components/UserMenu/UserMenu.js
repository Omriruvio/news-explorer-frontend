import './UserMenu.css';
import NavItem from '../NavItem/NavItem';
import { usePopups } from '../../contexts/PopupContext';
import { popupActions } from '../../reducers/popupReducer';

const UserMenu = ({ isDark }) => {
  const menuClassName = `user-menu ${isDark ? 'user-menu_dark' : ''}`;
  const [popupState, popupDispatch] = usePopups();

  const handleOverlayClick = (event) => {
    popupDispatch(popupActions.closeUserMenu);
  };

  return (
    <>
      <ul className={menuClassName}>
        <NavItem noDecoration isDark={isDark} text="Home" />
        <NavItem signinButton noDecoration isDark={isDark} text="Sign in" hasBubble isLarge></NavItem>
      </ul>
      <div onClick={handleOverlayClick} className="user-menu__overlay"></div>
    </>
  );
};

export default UserMenu;
