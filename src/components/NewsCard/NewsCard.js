import { useState } from 'react';
import './NewsCard.css';
import bookmarkGrey from '../../images/bookmark-grey.svg';

const NewsCard = ({ alt, src, date, header, text, source, link }) => {
  const [bookmarkIcon /* setBookmarkIcon */] = useState(bookmarkGrey);
  return (
    <article className="news-card">
      <div className="news-card__bookmark-button-container">
        <button className="news-card__bookmark-button" type="button">
          <img className="news-card__bookmark-button-image" src={bookmarkIcon} alt="bookmark icon"></img>
        </button>
      </div>
      <img className="news-card__image" src={src} alt={alt} />
      <div className="news-card__info">
        <span className="news-card__date">{date}</span>
        <h3 className="news-card__header">{header}</h3>
        <blockquote className="news-card__text" cite={source}>
          {text}
        </blockquote>
        <a className="news-card__ref" href={link}>
          {source}
        </a>
      </div>
    </article>
  );
};

export default NewsCard;
