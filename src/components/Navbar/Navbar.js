import Hamburger from '../Hamburger/Hamburger';
import useWindowSize from '../../hooks/UseWindowSize';
import './Navbar.css';
import NavItems from '../NavItems/NavItems.js';
import { MAX_MOBILE_SIZE } from '../../utils/constants';

const Navbar = () => {
  const isMobileSized = useWindowSize().width < MAX_MOBILE_SIZE;

  return isMobileSized ? <Hamburger /> : <NavItems />;
};

export default Navbar;
