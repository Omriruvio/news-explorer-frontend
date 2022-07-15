import './SignOutButton.css';
import signOutIcon from '../../images/logout.svg';
import signOutIconWhite from '../../images/logoutwhite.svg';
import { usePopups, popupActions } from '../../contexts/PopupContext';
import { useInfo } from '../../contexts/UserContext';
import { useLocation } from 'react-router';

const SignOutButton = ({ inUserMenu }) => {
  const [popupState, popupDispatch] = usePopups();
  const { currentUser, signOut } = useInfo();
  const inSavedNews = useLocation().pathname === '/saved-articles';
  const userName = currentUser.name;
  const wrapperClassName = `navbar__sign-out-wrapper ${
    inUserMenu ? 'navbar__sign-out-wrapper_type_menu' : !inSavedNews ? 'navbar__sign-out-wrapper_type_main' : ''
  }`;
  const buttonClassName = `navbar__sign-out-button ${inSavedNews && !popupState.isUserMenuOpen ? 'navbar__sign-out-button_type_saved-news' : ''}`;

  const handleClick = () => {
    signOut();
    localStorage.removeItem('jwt');
    popupDispatch(popupActions.closeUserMenu);
  };

  return (
    <li onClick={handleClick} className={wrapperClassName}>
      <button className={buttonClassName}>{userName}</button>
      <img className={'navbar__sign-out-icon'} alt='Sign out icon' src={inSavedNews && !popupState.isUserMenuOpen ? signOutIcon : signOutIconWhite} />
    </li>
  );
};

export default SignOutButton;
