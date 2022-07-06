import './Hamburger.css';
import { popupActions } from '../../reducers/popupReducer';
import { usePopups } from '../../contexts/PopupContext';

const Hamburger = ({ isDark }) => {
  const burgerClassName = `hamburger ${isDark ? 'hamburger_dark' : ''}`;
  const crossClassName = `cross-button ${isDark ? 'cross-button_dark' : ''}`;
  const [popupState, popupDispatch] = usePopups();
  const displayButton = () => (popupState.isUserMenuOpen ? crossClassName : burgerClassName);

  return <button onClick={() => popupDispatch(popupActions.toggleUserMenu)} className={displayButton()}></button>;
};

export default Hamburger;
