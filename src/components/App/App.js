import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Main from '../Main/Main';
import './App.css';
import Footer from '../Footer/Footer';
import Articles from '../Articles/Articles';
import { useEffect, useState } from 'react';
import { usePopups, popupActions } from '../../contexts/PopupContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { useAuth } from '../../contexts/AuthContext';
import { mainApi } from '../../utils/MainApi.ts';

function App() {
  const [, popupDispatch] = usePopups();
  const { currentUser } = useAuth();
  const [savedCards, setSavedCards] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const removeBookmark = (url) => {
    const card = savedCards.find((card) => card.url === url);
    if (card) {
      mainApi
        .deleteArticle(card.id)
        .then(() => {
          setSavedCards((oldCards) => oldCards.filter((card) => card.url !== url));
        })
        .catch((err) => console.log(err));
    } else {
      setSavedCards((oldCards) => oldCards.filter((card) => card.url !== url));
    }
  };

  useEffect(() => {
    const closeByEsc = (e) => {
      e.key === 'Escape' && popupDispatch(popupActions.closeAll);
    };
    document.addEventListener('keydown', closeByEsc);
    return () => document.removeEventListener('keydown', closeByEsc);
  }, [popupDispatch]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt && !currentUser.isLoggedIn && location.pathname === '/saved-articles') {
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
        .getUserArticles()
        .then((cards) => setSavedCards(cards))
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Main savedCards={savedCards} removeBookmark={removeBookmark} />} />
        <Route
          path='/saved-articles'
          element={
            <ProtectedRoute isLoggedIn={currentUser.isLoggedIn} redirectPath='/'>
              <Articles savedCards={savedCards} />
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
