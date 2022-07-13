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

const Articles = () => {
  const [displayCards, setDisplayCards] = useState([]);
  const [popupState] = usePopups();
  const isMobileSized = useWindowSize().width < 650;

  useEffect(() => {
    mainApi
      .getUserArticles()
      .then((cards) => {
        // interface Article {
        //   keyword: string;
        //   title: string;
        //   text: string;
        //   date: string;
        //   source: string;
        //   link: string;
        //   image: string;
        // }
        // { keyword, isSaved, /* author, content, */ title, description, publishedAt, url, urlToImage, source: { /* id, */ name } }
        const convertedCards = cards.map((article) => {
          return {
            keyword: article.keyword,
            title: article.title,
            description: article.text,
            publishedAt: article.date,
            url: article.link,
            urlToImage: article.image,
            source: { name: article.source },
          };
        });
        const newCards = convertedCards.map((card, i) => <NewsCard key={i} {...card} />);
        setDisplayCards(newCards);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header />
      {popupState.isUserMenuOpen && isMobileSized && <UserMenu />}
      <SavedNewsHeader />
      <ArticleSection>
        <ul className='results__article-container'>{displayCards}</ul>
      </ArticleSection>
    </>
  );
};

export default Articles;
