import Main from '../Main/Main';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Articles from '../Articles/Articles';
import { useEffect } from 'react';
import { usePopups, popupActions } from '../../contexts/PopupContext';

function App() {
  const [, popupDispatch] = usePopups();

  useEffect(() => {
    const closeByEsc = (e) => {
      e.key === 'Escape' && popupDispatch(popupActions.closeAll);
    };
    document.addEventListener('keydown', closeByEsc);
    return () => document.removeEventListener('keydown', closeByEsc);
  }, [popupDispatch]);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/saved-articles" element={<Articles />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
