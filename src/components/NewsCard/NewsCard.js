import './NewsCard.css';
import CardLabel from '../CardLabel/CardLabel';
import { parseDate } from '../../utils/parseDate';
import { mainApi } from '../../utils/MainApi.ts';
import { useState } from 'react';
import { useInfo } from '../../contexts/UserContext';

const NewsCard = ({ handleBookmark, removeBookmark, onTrashClick, ...card }) => {
  const {
    id,
    keyword,
    isSaved,
    title,
    description,
    publishedAt,
    url,
    urlToImage,
    source: { name },
  } = card;

  const [isFreshSave, setIsFreshSave] = useState(false);
  const { setAndSortSavedCards, savedCards } = useInfo();

  const handleBookmarkClick = () => {
    setAndSortSavedCards([...savedCards, { ...card, isSaved: true }]);
    mainApi
      .saveArticle({ date: publishedAt, image: urlToImage, keyword, link: url, source: name, text: description, title })
      .then(() => setIsFreshSave(true))
      .catch((err) => console.log(err));
  };

  const handleRemoveBookMark = () => {
    removeBookmark(card.url);
    setIsFreshSave(false);
  };

  const handleTrashClick = () => {
    onTrashClick(id);
  };

  return (
    <li>
      <article className='news-card'>
        <div className='news-card__image-container'>
          <CardLabel
            removeBookmark={handleRemoveBookMark}
            onTrashClick={handleTrashClick}
            onBookmark={handleBookmarkClick}
            text={keyword}
            isSaved={isSaved}
            isFreshSave={isFreshSave}
          />
          <a href={url} target={'_blank'} rel='noreferrer'>
            <img className='news-card__image' src={urlToImage} alt={title}></img>
          </a>
        </div>
        <div className='news-card__info'>
          <span className='news-card__date'>{parseDate(publishedAt)}</span>
          <h3 className='news-card__header'>{title}</h3>
          <blockquote className='news-card__text' cite={name}>
            {description}
          </blockquote>
        </div>
        <a className='news-card__ref hover-fade' href={url} target={'_blank'} rel='noreferrer'>
          {name}
        </a>
      </article>
    </li>
  );
};

export default NewsCard;
