import Header from '../Header/Header';
import './Main.css';
import { usePopups } from '../../contexts/PopupContext';
import UserMenu from '../UserMenu/UserMenu';

const Main = () => {
  const [popupState] = usePopups();
  return (
    <div className="main__wrapper">
      <Header></Header>
      {popupState.isUserMenuOpen && <UserMenu></UserMenu>}
    </div>
  );
};

export default Main;
