import Header from '../Header/Header';
import './Articles.css';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import ArticleSection from '../ArticleSection/ArticleSection';
import { useEffect, useState } from 'react';
// import { savedCards } from '../../constants/mockData';
import NewsCard from '../NewsCard/NewsCard';
import UserMenu from '../UserMenu/UserMenu';
import { usePopups } from '../../contexts/PopupContext';
import useWindowSize from '../../hooks/UseWindowSize';
import { mainApi } from '../../utils/MainApi.ts';

const Articles = ({ savedCards }) => {
  const [popupState] = usePopups();
  const [savedArticles, setSavedArticles] = useState();
  const isMobileSized = useWindowSize().width < 650;

  useEffect(() => {});

  return (
    <>
      <Header />
      {popupState.isUserMenuOpen && isMobileSized && <UserMenu />}
      <SavedNewsHeader savedCards={savedCards} />
      <ArticleSection>
        <ul className='results__article-container'>{savedCards}</ul>
      </ArticleSection>
    </>
  );
};

export default Articles;
