import Header from '../Header/Header';
import './Main.css';
import { usePopups } from '../../contexts/PopupContext';
import UserMenu from '../UserMenu/UserMenu';
import useWindowSize from '../../hooks/UseWindowSize';
import PageTitle from '../PageTitle/PageTitle';
import SearchForm from '../SearchForm/SearchForm';
import SearchResults from '../SearchResults/SearchResults';

const Main = () => {
  const isMobileSized = useWindowSize().width < 650;
  const [popupState] = usePopups();
  return (
    <>
      <div className="main__wrapper">
        <Header></Header>
        {popupState.isUserMenuOpen && isMobileSized && <UserMenu isDark={false} />}
        <PageTitle />
        <SearchForm />
      </div>
      <SearchResults />
    </>
  );
};

export default Main;
