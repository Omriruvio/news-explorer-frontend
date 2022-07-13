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
  const isMobileSized = useWindowSize().width < 650;

  return (
    <>
      <Header />
      {popupState.isUserMenuOpen && isMobileSized && <UserMenu />}
      <SavedNewsHeader />
      <ArticleSection>
        <ul className='results__article-container'>{savedCards}</ul>
      </ArticleSection>
    </>
  );
};

export default Articles;
