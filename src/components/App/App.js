import { Routes, Route, Navigate } from 'react-router-dom';
import Main from '../Main/Main';
import './App.css';
import Footer from '../Footer/Footer';
import Articles from '../Articles/Articles';
import { useEffect } from 'react';
import { usePopups, popupActions } from '../../contexts/PopupContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { useAuth } from '../../contexts/AuthContext';

function App() {
  const [, popupDispatch] = usePopups();
  const { currentUser } = useAuth();

  useEffect(() => {
    const closeByEsc = (e) => {
      e.key === 'Escape' && popupDispatch(popupActions.closeAll);
    };
    document.addEventListener('keydown', closeByEsc);
    return () => document.removeEventListener('keydown', closeByEsc);
  }, [popupDispatch]);

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
