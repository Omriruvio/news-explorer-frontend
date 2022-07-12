import { Link } from 'react-router-dom';
import { usePopups, popupActions } from '../../contexts/PopupContext';
import { useLocation } from 'react-router';
import './Logo.css';

const Logo = () => {
  const [popupState, popupReducer] = usePopups();
  const locationIsArticles = useLocation().pathname === '/saved-articles';
  const linkStyle = `logo-text logo-text_${locationIsArticles && !popupState.isUserMenuOpen ? 'dark' : 'light'}`;
  return (
    <Link onClick={() => popupReducer(popupActions.closeAll)} to="/">
      <span className={linkStyle}>NewsExplorer</span>
    </Link>
  );
};

export default Logo;
