import Header from '../Header/Header';
import './Articles.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import ArticleSection from '../ArticleSection/ArticleSection';
import { useEffect, useState } from 'react';
import { savedCards } from '../../constants/mockData';
import NewsCard from '../NewsCard/NewsCard';

const Articles = () => {
  const [displayCards, setDisplayCards] = useState([]);

  useEffect(() => {
    const newCards = savedCards.map((card, i) => <NewsCard key={i} {...card} />);
    setDisplayCards(newCards);
  }, []);

  return (
    <>
      <Header />
      <SavedNewsHeader />
      <ArticleSection>
        <ul className="results__article-container">{displayCards}</ul>
      </ArticleSection>
    </>
  );
};

export default Articles;
