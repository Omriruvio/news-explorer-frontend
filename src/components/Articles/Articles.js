import Header from '../Header/Header';
import './Articles.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import ArticleSection from '../ArticleSection/ArticleSection';
import UserMenu from '../UserMenu/UserMenu';
import { usePopups } from '../../contexts/PopupContext';
import useWindowSize from '../../hooks/UseWindowSize';
import { useInfo } from '../../contexts/UserContext';
import { mainApi } from '../../utils/MainApi.ts';
import NewsCard from '../NewsCard/NewsCard';
import { useEffect } from 'react';
import { MAX_MOBILE_SIZE } from '../../utils/constants';

const Articles = () => {
  const [popupState] = usePopups();
  const isMobileSized = useWindowSize().width < MAX_MOBILE_SIZE;
  const { savedCards, setAndSortSavedCards } = useInfo();

  useEffect(() => {
    mainApi
      .getUserArticles()
      .then((cards) => {
        setAndSortSavedCards(cards);
      })
      .catch((err) => console.log(err));
  }, [setAndSortSavedCards]);

  return (
    <>
      <Header />
      {popupState.isUserMenuOpen && isMobileSized && <UserMenu />}
      <SavedNewsHeader />
      <ArticleSection>
        <ul className='results__article-container'>
          {savedCards.map((card) => (
            <NewsCard key={card.id} {...card} />
          ))}
        </ul>
      </ArticleSection>
    </>
  );
};

export default Articles;
