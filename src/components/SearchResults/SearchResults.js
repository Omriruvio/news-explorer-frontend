import './SearchResults.css';
import NewsCard from '../NewsCard/NewsCard';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import { useCallback, useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import ArticleSection from '../ArticleSection/ArticleSection';
import { useInfo } from '../../contexts/UserContext';

const SearchResults = ({ handleBookmark, removeBookmark, isSearching, searchResults, keyword }) => {
  const [displaySets, setDisplaySets] = useState(0);
  const [displayCards, setDisplayCards] = useState([]);
  const { savedCards } = useInfo();

  const handleGetNextCards = () => {
    const nextThree = getDisplayCards(searchResults, displaySets + 1);
    setDisplayCards(nextThree);
    setDisplaySets(displaySets + 1);
  };

  const getDisplayCards = useCallback(
    (cardArray, count = 1, size = 3) => {
      const lastIndex = count * size - 1;
      const cardsToDisplay = cardArray.slice(0, lastIndex + 1).map((card) => {
        return { ...card, isSaved: savedCards.some((savedCard) => savedCard.url === card.url) };
      });
      return cardsToDisplay;
    },
    [savedCards]
  );

  useEffect(() => {
    // console.log(getDisplayCards(searchResults));
    setDisplaySets(0);
    setDisplayCards([]);
    if (searchResults?.length !== 0) {
      setDisplayCards(getDisplayCards(searchResults));
      setDisplaySets(1);
    }
  }, [searchResults, getDisplayCards]);

  return (
    <>
      {isSearching && <Preloader text={` Searching for news...`} />}
      {!isSearching && displaySets !== 0 && (
        <ArticleSection>
          {displaySets !== 0 && <h2 className='results__title'>Search results</h2>}
          <ul className='results__article-container'>
            {displayCards.map((card, i) => (
              <NewsCard key={i} removeBookmark={removeBookmark} handleBookmark={handleBookmark} keyword={keyword} {...card}></NewsCard>
            ))}
          </ul>
          {!isSearching && displayCards.length < searchResults.length && <ShowMoreButton getNextCards={handleGetNextCards} />}
        </ArticleSection>
      )}
    </>
  );
};

export default SearchResults;
