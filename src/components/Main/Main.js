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
import { useAuth } from '../../contexts/AuthContext';
import AuthForm from '../AuthForm/AuthForm';
import { useState, useEffect } from 'react';
import NothingFound from '../NothingFound/NothingFound';
import { mainApi } from '../../utils/MainApi.ts';
import ConnectionError from '../ConnectionError/ConnectionError';

const Main = ({ savedCards, handleBookmark, removeBookmark }) => {
  const isMobileSized = useWindowSize().width < 650;
  const [popupState, popupDispatch] = usePopups();
  const { signIn } = useAuth();
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState();
  const [nothingFound, setNothingFound] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [responseError, setResponseError] = useState(null);

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

  const handleSignup = ({ email, password, username }) => {
    mainApi
      .userSignup(email, password, username)
      .then((user) => {
        popupDispatch(popupActions.openSuccessPopup);
        popupDispatch(popupActions.closeSignUpPopup);
      })
      .catch((err) => {
        console.log(err.message);
        setResponseError(err.message);
      });
  };

  const handleSignin = ({ email, password }) => {
    mainApi
      .userSignin(email, password)
      .then((user) => {
        signIn(user.name);
        localStorage.setItem('jwt', JSON.stringify(user.token));
        mainApi.setUserToken(user.token);
        popupDispatch(popupActions.closeSignInPopup);
      })
      .catch((err) => {
        console.log(err);
        setResponseError(err.message);
      });
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
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.setUserToken(JSON.parse(jwt));
      mainApi
        .getCurrentUser()
        .then((user) => {
          signIn(user.name);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          const searchResults = localStorage.getItem('searchResults');
          if (searchResults) {
            const { keyword, results } = JSON.parse(searchResults);
            setSearchResults(results);
            setSearchKeyword(keyword);
          }
        });
    }
  }, [signIn]);

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
      <SearchResults
        handleBookmark={handleBookmark}
        removeBookmark={removeBookmark}
        savedCards={savedCards}
        keyword={searchKeyword}
        isSearching={isSearching}
        searchResults={searchResults}
      />
      <AboutMe />
    </>
  );
};

export default Main;
