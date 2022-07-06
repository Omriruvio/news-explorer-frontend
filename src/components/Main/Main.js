import Header from '../Header/Header';
import './Main.css';
import { usePopups } from '../../contexts/PopupContext';
import UserMenu from '../UserMenu/UserMenu';
import useWindowSize from '../../hooks/UseWindowSize';

const Main = () => {
  const isMobileSized = useWindowSize().width < 650;
  const [popupState] = usePopups();
  return (
    <div className="main__wrapper">
      <Header></Header>
      {popupState.isUserMenuOpen && isMobileSized && <UserMenu></UserMenu>}
    </div>
  );
};

export default Main;
