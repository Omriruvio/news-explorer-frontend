import Header from '../Header/Header';
import './Main.css';
import UserMenu from '../UserMenu/UserMenu';
import useWindowSize from '../../hooks/UseWindowSize';
import PageTitle from '../PageTitle/PageTitle';
import SearchForm from '../SearchForm/SearchForm';
import SearchResults from '../SearchResults/SearchResults';
import AboutMe from '../AboutMe/AboutMe';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { usePopups, popupActions } from '../../contexts/PopupContext';
import AuthForm from '../AuthForm/AuthForm';
import { useState, useEffect } from 'react';
import NothingFound from '../NothingFound/NothingFound';
import ConnectionError from '../ConnectionError/ConnectionError';
import { MAX_MOBILE_SIZE } from '../../utils/constants';

const Main = ({ handleSignin, handleSignup, responseError, setResponseError }) => {
  const isMobileSized = useWindowSize().width < MAX_MOBILE_SIZE;
  const [popupState, popupDispatch] = usePopups();
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [nothingFound, setNothingFound] = useState(false);
  const [connectionError, setConnectionError] = useState(false);

  const showSignUp = () => {
    setResponseError(null);
    popupDispatch(popupActions.closeAll);
    popupDispatch(popupActions.openSignUpPopup);
  };

  const showSignIn = () => {
    setResponseError(null);
    popupDispatch(popupActions.closeAll);
    popupDispatch(popupActions.openSignInPopup);
  };

  const handleSearchSubmit = (results, keyword) => {
    setSearchKeyword(keyword);
    setNothingFound(false);
    setSearchResults([]);
    if (!results || results.length === 0) {
      setNothingFound(true);
    } else {
      setSearchResults(results);
      localStorage.setItem('searchResults', JSON.stringify({ keyword, results }));
    }
  };

  useEffect(() => {
    const searchResults = localStorage.getItem('searchResults');
    if (searchResults) {
      const { results, keyword } = JSON.parse(searchResults);
      setSearchResults(results);
      setSearchKeyword(keyword);
    }
  }, []);

  return (
    <>
      {popupState.isSigninPopupOpen && (
        <PopupWithForm
          isOpen={popupState.isSigninPopupOpen}
          onSubmit={handleSignin}
          isValid={true}
          formName='signin'
          title='Sign in'
          buttonText='Sign in'
          redirectText='Sign up'
          handleRedirect={showSignUp}
          responseError={responseError}
        >
          <AuthForm />
        </PopupWithForm>
      )}
      {popupState.isSignupPopupOpen && (
        <PopupWithForm
          withNameField
          isOpen={popupState.isSignupPopupOpen}
          onSubmit={handleSignup}
          isValid={true}
          formName='signup'
          title='Sign up'
          buttonText='Sign up'
          redirectText='Sign in'
          handleRedirect={showSignIn}
          responseError={responseError}
        >
          <AuthForm />
        </PopupWithForm>
      )}
      {popupState.isSuccessPopupOpen && (
        <PopupWithForm
          hideForm={true}
          formName='success'
          isOpen={popupState.isSuccessPopupOpen}
          title='Registration successfully completed!'
          redirectText='Sign in'
          handleRedirect={showSignIn}
        ></PopupWithForm>
      )}
      <section className='main'>
        <Header />
        {popupState.isUserMenuOpen && isMobileSized && <UserMenu />}
        <PageTitle />
        <SearchForm connectionError={setConnectionError} handleSearch={handleSearchSubmit} setIsSearching={setIsSearching} />
      </section>
      {nothingFound && <NothingFound />}
      {connectionError && <ConnectionError />}
      <SearchResults keyword={searchKeyword} isSearching={isSearching} searchResults={searchResults} />
      <AboutMe />
    </>
  );
};

export default Main;
