import { Link } from 'react-router-dom';
import { usePopups } from '../../contexts/PopupContext';
import { popupActions } from '../../reducers/popupReducer';
import './Logo.css';

const Logo = ({ isDark }) => {
  const [, popupReducer] = usePopups();
  const linkStyle = `logo-text logo-text_${isDark ? 'dark' : 'light'}`;
  return (
    <Link onClick={() => popupReducer(popupActions.closeAll)} style={{ textDecoration: 'none', color: 'inherit' }} to="/">
      <span className={linkStyle}>NewsExplorer</span>
    </Link>
  );
};

export default Logo;
