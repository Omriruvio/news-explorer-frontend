import LogoutIconWhite from '../../images/logoutwhite.svg';
import LogoutIconBlack from '../../images/logout.svg';
import './LogoutIcon.css';

const LogoutIcon = ({ isDark, marginLeft }) => {
  return (
    <img
      style={{ marginLeft }}
      className="navbar__logout-icon"
      src={isDark ? LogoutIconBlack : LogoutIconWhite}
      alt="Outowards pointing arrow for log out functionality"
    ></img>
  );
};

export default LogoutIcon;
