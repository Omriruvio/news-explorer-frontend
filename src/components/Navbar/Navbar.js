import Hamburger from '../Hamburger/Hamburger';
import useWindowSize from '../../hooks/UseWindowSize';
import './Navbar.css';
import NavItems from '../NavItems/NavItems.js';

const Navbar = ({ isDark }) => {
  const isMobileSized = useWindowSize().width < 650;

  return isMobileSized ? <Hamburger isDark={isDark} /> : <NavItems isDark={isDark} />;
};

export default Navbar;
