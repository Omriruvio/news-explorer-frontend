import './SearchResults.css';
import NewsCard from '../NewsCard/NewsCard';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import { useEffect, useState } from 'react';
import { exampleCards } from '../../constants/mockData';
import Preloader from '../Preloader/Preloader';
import ArticleSection from '../ArticleSection/ArticleSection';

const SearchResults = () => {
  const [displayCards, setDisplayCards] = useState([]);
  const [displaySets, setDisplaySets] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getDisplayCards = (cardArray, count = 1, size = 3) => {
    const lastIndex = count * size - 1;
    const cardsToDisplay = cardArray.slice(0, lastIndex + 1);
    // TODO - replace key with unique card id
    return cardsToDisplay.map((card, i) => <NewsCard key={i} {...card}></NewsCard>);
  };

  const handleGetNextCards = () => {
    // temporary fake loading time
    new Promise((reslove) => {
      setIsLoading(true);
      setTimeout(reslove, 1500);
    }).then(() => {
      setIsLoading(false);
      const cards = getDisplayCards(exampleCards, displaySets + 1);
      setDisplayCards(cards);
      setDisplaySets(displaySets + 1);
    });
  };

  useEffect(() => {
    const newCards = getDisplayCards(exampleCards, displaySets);
    setDisplayCards(newCards);
  }, [displaySets]);

  return (
    /* displaySets !== 0 && */
    <ArticleSection>
      {displaySets !== 0 && <h2 className="results__title">Search results</h2>}
      <ul className="results__article-container">{displayCards}</ul>
      {!isLoading && <ShowMoreButton getNextCards={handleGetNextCards} />}
      {isLoading && <Preloader />}
    </ArticleSection>
  );
};

export default SearchResults;
