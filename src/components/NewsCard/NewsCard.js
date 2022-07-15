import './NewsCard.css';
import CardLabel from '../CardLabel/CardLabel';
import { parseDate } from '../../utils/parseDate';
import { mainApi } from '../../utils/MainApi.ts';
import { useState } from 'react';
import { useInfo } from '../../contexts/UserContext';
import { popupActions, usePopups } from '../../contexts/PopupContext';

const NewsCard = ({ removeBookmark, ...card }) => {
  const {
    id: searchId,
    keyword,
    isSaved,
    title,
    description,
    publishedAt,
    url,
    urlToImage,
    source: { name },
  } = card;

  const { currentUser, setAndSortSavedCards, savedCards } = useInfo();
  const [, popupDispatch] = usePopups();
  const [saveId, setSaveId] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleBookMark = () => {
    if (!currentUser.isLoggedIn) {
      popupDispatch(popupActions.openSignInPopup);
    } else if (isSaved || saveId) {
      // found as saved through search (no saveId)
      // or added as saved through search (saveId added)
      mainApi
        .deleteArticle(saveId || searchId)
        .then((cards) => {
          setAndSortSavedCards(cards);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setAndSortSavedCards(savedCards.filter((xCard) => xCard.url !== url));
          setSaveId(null);
          setIsDeleted(true);
        });
    } else {
      mainApi
        .saveArticle({ date: publishedAt, image: urlToImage, keyword, link: url, source: name, text: description, title })
        .then((card) => {
          setSaveId(card._id);
          setIsDeleted(false);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleTrashClick = () => {
    mainApi
      .deleteArticle(searchId || saveId)
      .then(() => {
        setAndSortSavedCards(savedCards.filter((card) => card.id !== searchId || saveId));
      })
      .catch((err) => console.log(err));
  };

  return (
    <li>
      <article className='news-card'>
        <div className='news-card__image-container'>
          <CardLabel
            onTrashClick={handleTrashClick}
            onBookmark={handleBookMark}
            text={keyword}
            isSaved={isSaved}
            saveId={saveId}
            isDeleted={isDeleted}
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
