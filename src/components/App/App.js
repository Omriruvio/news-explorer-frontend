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
  const [popupState, popupDispatch] = usePopups();
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
      console.log('happens when card removed before making it to API');
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
    console.log(currentUser);
    console.log(popupState);
    if (currentUser.isLoggedIn) {
      mainApi.setUserToken(JSON.parse(localStorage.getItem('jwt')));
      mainApi
        .getUserArticles()
        .then((cards) => setSavedCards(cards))
        .catch((err) => console.log(err));
    } else if (location.pathname === '/saved-articles') {
      navigate('/');
      popupDispatch(popupActions.openSignUpPopup);
    }
  }, [currentUser, navigate, popupDispatch, location.pathname, popupState]);

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
