import Main from '../Main/Main';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Articles from '../Articles/Articles';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/saved-articles" element={<Articles isDark />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
