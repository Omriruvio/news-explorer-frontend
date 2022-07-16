import './App.css';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Articles from '../Articles/Articles';
import { useEffect, useState } from 'react';
import { usePopups, popupActions } from '../../contexts/PopupContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { useInfo } from '../../contexts/UserContext';
import { mainApi } from '../../utils/MainApi.ts';

function App() {
  const [, popupDispatch] = usePopups();
  const { currentUser, setAndSortSavedCards, signIn } = useInfo();
  const navigate = useNavigate();
  const location = useLocation();
  const [responseError, setResponseError] = useState(null);

  const handleSignup = ({ email, password, username }) => {
    mainApi
      .userSignup(email, password, username)
      .then(() => {
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
        mainApi.getUserArticles().then((cards) => {
          setAndSortSavedCards(cards);
        });
      })
      .catch((err) => {
        console.log(err);
        setResponseError(err.message);
      });
  };

  useEffect(() => {
    const closeByEsc = (e) => {
      e.key === 'Escape' && popupDispatch(popupActions.closeAll);
    };
    document.addEventListener('keydown', closeByEsc);
    return () => document.removeEventListener('keydown', closeByEsc);
  }, [popupDispatch]);

  useEffect(() => {
    if (!currentUser.isLoggedIn && location.pathname === '/saved-articles') {
      navigate('/');
      popupDispatch(popupActions.openSignUpPopup);
    }
  }, [currentUser.isLoggedIn, navigate, popupDispatch, location.pathname]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.setUserToken(JSON.parse(jwt));
      mainApi
        .getCurrentUser()
        .then((user) => {
          signIn(user.name);
        })
        .catch((err) => console.log(err));
      mainApi
        .getUserArticles()
        .then((cards) => {
          setAndSortSavedCards(cards);
        })
        .catch((err) => console.log(err));
    }
  }, [setAndSortSavedCards, signIn]);

  return (
    <div className='app'>
      <Routes>
        <Route
          path='/'
          element={<Main responseError={responseError} setResponseError={setResponseError} handleSignin={handleSignin} handleSignup={handleSignup} />}
        />
        <Route
          path='/saved-articles'
          element={
            <ProtectedRoute isLoggedIn={currentUser.isLoggedIn} redirectPath='/'>
              <Articles />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
