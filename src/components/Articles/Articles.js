import Header from '../Header/Header';
import './Articles.css';
import UserMenu from '../UserMenu/UserMenu';
import { usePopups } from '../../contexts/PopupContext';
import useWindowSize from '../../hooks/UseWindowSize';

const Articles = () => {
  const isMobileSized = useWindowSize().width < 650;
  const [popupState] = usePopups();
  return (
    <>
      <Header isDark></Header>
      {popupState.isUserMenuOpen && isMobileSized && <UserMenu isDark />}
    </>
  );
};

export default Articles;
