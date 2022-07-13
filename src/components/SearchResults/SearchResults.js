import './SearchResults.css';
import NewsCard from '../NewsCard/NewsCard';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import { useCallback, useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import ArticleSection from '../ArticleSection/ArticleSection';

const SearchResults = ({ isSearching, searchResults, keyword }) => {
  const [displaySets, setDisplaySets] = useState(0);
  const [displayCards, setDisplayCards] = useState([]);

  const getDisplayCards = useCallback(
    (cardArray, count = 1, size = 3) => {
      const lastIndex = count * size - 1;
      const cardsToDisplay = cardArray.slice(0, lastIndex + 1);
      // TODO - replace key with unique card id
      return cardsToDisplay.map((card, i) => <NewsCard key={i} keyword={keyword} {...card}></NewsCard>);
    },
    [keyword]
  );

  const handleGetNextCards = () => {
    const nextThree = getDisplayCards(searchResults, displaySets + 1);
    setDisplayCards(nextThree);
    setDisplaySets(displaySets + 1);
  };

  useEffect(() => {
    setDisplaySets(0);
    setDisplayCards([]);
    if (searchResults.length !== 0) {
      const newCards = getDisplayCards(searchResults);
      setDisplayCards(newCards);
      setDisplaySets(1);
    }
  }, [searchResults, getDisplayCards]);

  return (
    <>
      {isSearching && <Preloader text={` Searching for news...`} />}
      {displaySets !== 0 && (
        <ArticleSection>
          {displaySets !== 0 && <h2 className='results__title'>Search results</h2>}
          <ul className='results__article-container'>{displayCards}</ul>
          {!isSearching && displayCards.length < searchResults.length && <ShowMoreButton getNextCards={handleGetNextCards} />}
        </ArticleSection>
      )}
    </>
  );
};

export default SearchResults;
