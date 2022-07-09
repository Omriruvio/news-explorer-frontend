import Main from '../Main/Main';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Articles from '../Articles/Articles';
import { useEffect } from 'react';
import { usePopups } from '../../contexts/PopupContext';
import { popupActions } from '../../reducers/popupReducer';

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
        <Route path="/saved-articles" element={<Articles isDark />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
