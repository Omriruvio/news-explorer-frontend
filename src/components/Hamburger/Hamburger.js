import './Hamburger.css';
import { popupActions } from '../../utils/reducers/popupReducer';
import { usePopups } from '../../contexts/PopupContext';

const Hamburger = ({ isDark }) => {
  const burgerClassName = `hamburger ${isDark ? 'hamburger_dark' : ''}`;
  const [, popupDispatch] = usePopups();

  return <button onClick={() => popupDispatch(popupActions.toggleUserMenu)} className={burgerClassName}></button>;
};

export default Hamburger;
