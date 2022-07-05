import { Link } from 'react-router-dom';
import './Logo.css';

const Logo = ({ isDark }) => {
  const linkStyle = `logo-text logo-text_${isDark ? 'dark' : 'light'}`;
  return (
    <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/">
      <span className={linkStyle}>NewsExplorer</span>
    </Link>
  );
};

export default Logo;
