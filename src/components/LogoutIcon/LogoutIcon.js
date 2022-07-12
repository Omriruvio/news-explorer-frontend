import LogoutIconWhite from '../../images/logoutwhite.svg';
import LogoutIconBlack from '../../images/logout.svg';
import './LogoutIcon.css';
import { useLocation } from 'react-router';

const LogoutIcon = ({ styles }) => {
  const isSavedArticles = useLocation().pathname === '/saved-articles';
  return (
    <img
      style={styles}
      className="navbar__logout-icon"
      src={isSavedArticles ? LogoutIconBlack : LogoutIconWhite}
      alt="Outowards pointing arrow for log out functionality"
    ></img>
  );
};

export default LogoutIcon;
