import './Header.css';
import Logo from '../Logo/Logo';
import Navbar from '../Navbar/Navbar';
import DecoratorLine from '../DecoratorLine/DecoratorLine';

const Header = ({ isDark }) => {
  return (
    <>
      <div className="header">
        <Logo isDark={isDark} />
        <Navbar isDark={isDark} />
      </div>
      <DecoratorLine isDark={isDark} />
    </>
  );
};

export default Header;
