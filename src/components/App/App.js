import { Routes, Route, Navigate } from 'react-router-dom';
import Main from '../Main/Main';
import './App.css';
import Footer from '../Footer/Footer';
import Articles from '../Articles/Articles';
import { useEffect, useState } from 'react';
import { usePopups, popupActions } from '../../contexts/PopupContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { useAuth } from '../../contexts/AuthContext';
import NewsCard from '../NewsCard/NewsCard';
import { mainApi } from '../../utils/MainApi.ts';

function App() {
  const [, popupDispatch] = usePopups();
  const { currentUser } = useAuth();
  const [savedCards, setSavedCards] = useState([]);

  const handleTrashClick = (id) => {
    console.log('remove card id: ', id);
    mainApi
      .deleteArticle(id)
      .then(() => {
        const newCards = savedCards.filter((card) => card.id !== id);
        setSavedCards(newCards);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const closeByEsc = (e) => {
      e.key === 'Escape' && popupDispatch(popupActions.closeAll);
    };
    document.addEventListener('keydown', closeByEsc);
    return () => document.removeEventListener('keydown', closeByEsc);
  }, [popupDispatch]);

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      mainApi.setUserToken(JSON.parse(localStorage.getItem('jwt')));
      mainApi
        .getUserArticles()
        .then((cards) => {
          const convertedCards = cards.map((article) => {
            return {
              keyword: article.keyword,
              title: article.title,
              description: article.text,
              publishedAt: article.date,
              url: article.link,
              urlToImage: article.image,
              source: { name: article.source },
              id: article._id,
            };
          });
          setSavedCards(convertedCards);
        })
        .catch((err) => console.log(err));
    }
  }, [currentUser]);

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Main savedCards={savedCards} />} />
        <Route
          path='/saved-articles'
          element={
            <ProtectedRoute isLoggedIn={currentUser.isLoggedIn} redirectPath='/'>
              <Articles
                savedCards={savedCards.map((card) => (
                  <NewsCard key={card.id} onTrashClick={handleTrashClick} {...card} />
                ))}
              />
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
