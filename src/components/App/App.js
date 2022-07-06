import Main from '../Main/Main';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Articles from '../Articles/Articles';

function App() {
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
