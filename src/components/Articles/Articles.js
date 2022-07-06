import Header from '../Header/Header';
import './Articles.css';
import UserMenu from '../UserMenu/UserMenu';
import { usePopups } from '../../contexts/PopupContext';

const Articles = () => {
  const [popupState] = usePopups();
  return (
    <>
      <Header isDark></Header>
      {popupState.isUserMenuOpen && <UserMenu isDark />}
    </>
  );
};

export default Articles;
