import './SignInButton.css';
import { usePopups, popupActions } from '../../contexts/PopupContext';

const SignInButton = ({ inUserMenu }) => {
  const [, popupDispatch] = usePopups();
  const wrapperClassName = `navbar__sign-in-wrapper ${inUserMenu ? 'navbar__sign-in-wrapper_type_menu' : ''}`;

  const handleClick = () => {
    popupDispatch(popupActions.openSignInPopup);
    popupDispatch(popupActions.closeUserMenu);
  };

  return (
    <li onClick={handleClick} className={wrapperClassName}>
      <button className={'navbar__sign-in-button'}>Sign in</button>
    </li>
  );
};

export default SignInButton;
