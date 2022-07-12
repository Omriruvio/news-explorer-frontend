import Header from '../Header/Header';
import './Articles.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import ArticleSection from '../ArticleSection/ArticleSection';
import { useEffect, useState } from 'react';
import { savedCards } from '../../constants/mockData';
import NewsCard from '../NewsCard/NewsCard';
import UserMenu from '../UserMenu/UserMenu';
import { usePopups } from '../../contexts/PopupContext';
import useWindowSize from '../../hooks/UseWindowSize';

const Articles = () => {
  const [displayCards, setDisplayCards] = useState([]);
  const [popupState] = usePopups();
  const isMobileSized = useWindowSize().width < 650;

  useEffect(() => {
    const newCards = savedCards.map((card, i) => <NewsCard key={i} {...card} />);
    setDisplayCards(newCards);
  }, []);

  return (
    <>
      <Header />
      {popupState.isUserMenuOpen && isMobileSized && <UserMenu />}
      <SavedNewsHeader />
      <ArticleSection>
        <ul className="results__article-container">{displayCards}</ul>
      </ArticleSection>
    </>
  );
};

export default Articles;
