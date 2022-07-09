import Header from '../Header/Header';
import './Main.css';
import { usePopups } from '../../contexts/PopupContext';
import UserMenu from '../UserMenu/UserMenu';
import useWindowSize from '../../hooks/UseWindowSize';
import PageTitle from '../PageTitle/PageTitle';
import SearchForm from '../SearchForm/SearchForm';
import SearchResults from '../SearchResults/SearchResults';
import AboutMe from '../AboutMe/AboutMe';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { popupActions } from '../../reducers/popupReducer';
import { useAuth } from '../../contexts/AuthContext';
import AuthForm from '../AuthForm/AuthForm';

const Main = () => {
  const isMobileSized = useWindowSize().width < 650;
  const [popupState, popupDispatch] = usePopups();
  const { signIn } = useAuth();
  const showSignUp = () => {
    popupDispatch(popupActions.closeAll);
    popupDispatch(popupActions.openSignUpPopup);
  };
  const showSignIn = () => {
    popupDispatch(popupActions.closeAll);
    popupDispatch(popupActions.openSignInPopup);
  };
  const handleSignup = () => {
    popupDispatch(popupActions.openSuccessPopup);
    popupDispatch(popupActions.closeSignUpPopup);
  };
  const handleSignin = () => {
    // temporary - pre APIs
    signIn('Elise');
    popupDispatch(popupActions.closeSignInPopup);
  };
  return (
    <>
      <PopupWithForm
        isOpen={popupState.isSigninPopupOpen}
        onSubmit={handleSignin}
        isValid={true}
        name="signin"
        title="Sign in"
        buttonText="Sign in"
        redirectText="Sign up"
        handleRedirect={showSignUp}
      >
        <AuthForm />
      </PopupWithForm>
      <PopupWithForm
        isOpen={popupState.isSignupPopupOpen}
        onSubmit={handleSignup}
        isValid={true}
        name="signup"
        title="Sign up"
        buttonText="Sign up"
        redirectText="Sign in"
        handleRedirect={showSignIn}
      >
        <AuthForm />
      </PopupWithForm>
      <PopupWithForm
        hideForm={true}
        name="success"
        isOpen={popupState.isSuccessPopupOpen}
        title="Registration successfully completed!"
        redirectText="Sign in"
        handleRedirect={showSignIn}
      ></PopupWithForm>
      <div className="main__wrapper">
        <Header></Header>
        {popupState.isUserMenuOpen && isMobileSized && <UserMenu isDark={false} />}
        <PageTitle />
        <SearchForm />
      </div>
      <SearchResults />
      <AboutMe />
    </>
  );
};

export default Main;
