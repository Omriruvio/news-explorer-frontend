import './App.css';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Articles from '../Articles/Articles';
import { useEffect } from 'react';
import { usePopups, popupActions } from '../../contexts/PopupContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { useInfo } from '../../contexts/UserContext';
import { mainApi } from '../../utils/MainApi.ts';

function App() {
  const [, popupDispatch] = usePopups();
  const { currentUser, setAndSortSavedCards } = useInfo();
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useInfo();

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
      return;
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
        <Route path='/' element={<Main />} />
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
