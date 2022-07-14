import Header from '../Header/Header';
import './Articles.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import ArticleSection from '../ArticleSection/ArticleSection';
import { useEffect, useState } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import UserMenu from '../UserMenu/UserMenu';
import { usePopups } from '../../contexts/PopupContext';
import useWindowSize from '../../hooks/UseWindowSize';
import { mainApi } from '../../utils/MainApi.ts';
import { sortByRelevance } from '../../utils/sortByRelevance.ts';

const Articles = ({ savedCards }) => {
  const [popupState] = usePopups();
  const [freshCards, setFreshCards] = useState([]);
  const isMobileSized = useWindowSize().width < 650;

  const handleTrashClick = (id) => {
    mainApi
      .deleteArticle(id)
      .then(() => {
        setFreshCards((oldCards) => oldCards.filter((card) => card.id !== id));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    mainApi
      .getUserArticles()
      .then((cards) => {
        console.log(cards);
        const sortedCards = sortByRelevance(cards);
        console.log(sortedCards);
        setFreshCards(sortedCards);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header />
      {popupState.isUserMenuOpen && isMobileSized && <UserMenu />}
      <SavedNewsHeader savedCards={freshCards /*  || savedCards */} />
      <ArticleSection>
        <ul className='results__article-container'>
          {freshCards.map((card, i) => (
            <NewsCard key={i} onTrashClick={handleTrashClick} {...card} />
          ))}
        </ul>
      </ArticleSection>
    </>
  );
};

export default Articles;
