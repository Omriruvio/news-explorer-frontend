import './UserMenu.css';
import NavItem from '../NavItem/NavItem';

const UserMenu = ({ isDark }) => {
  return (
    <ul className="user-menu">
      <NavItem alignSelf={'flex-start'} noDecoration isDark={isDark} text="Home" />
      <NavItem signinButton noDecoration isDark={isDark} text="Sign in" hasBubble isLarge></NavItem>
    </ul>
  );
};

export default UserMenu;
