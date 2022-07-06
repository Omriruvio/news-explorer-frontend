import './UserMenu.css';
import NavItem from '../NavItem/NavItem';

const UserMenu = ({ isDark }) => {
  return (
    <>
      <NavItem isDark={isDark} text="Home" />
    </>
  );
};

export default UserMenu;
