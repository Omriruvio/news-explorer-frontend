import './Hamburger.css';
import { usePopups, popupActions } from '../../contexts/PopupContext';
import { useLocation, useNavigate } from 'react-router';

const Hamburger = () => {
  const locationIsArticles = useLocation().pathname === '/saved-articles';
  const burgerClassName = `hamburger ${locationIsArticles ? 'hamburger_dark' : ''}`;
  const crossClassName = `cross-button ${locationIsArticles ? 'cross-button_dark' : ''}`;
  const [popupState, popupDispatch] = usePopups();
  const displayButton = () => (popupState.isUserMenuOpen ? crossClassName : burgerClassName);
  const navigate = useNavigate();

  const handleBurgerClick = () => {
    if (!locationIsArticles) {
      popupDispatch(popupActions.toggleUserMenu);
    } else navigate('/', { replace: true });
  };

  return <button onClick={handleBurgerClick} className={displayButton()}></button>;
};

export default Hamburger;
