import Hamburger from '../Hamburger/Hamburger';
import useWindowSize from '../../hooks/UseWindowSize';
import './Navbar.css';
import NavItems from '../NavItems/NavItems.js';

const Navbar = () => {
  const isMobileSized = useWindowSize().width < 650;

  return isMobileSized ? <Hamburger /> : <NavItems />;
};

export default Navbar;
