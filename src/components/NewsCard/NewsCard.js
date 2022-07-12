import './NewsCard.css';
import CardLabel from '../CardLabel/CardLabel';

const NewsCard = ({ alt, src, date, header, text, source, link }) => {
  return (
    <li>
      <article className="news-card">
        <div className="news-card__image-container">
          <CardLabel />
          <img className="news-card__image" src={src} alt={alt}></img>
        </div>
        <div className="news-card__info">
          <span className="news-card__date">{date}</span>
          <h3 className="news-card__header">{header}</h3>
          <blockquote className="news-card__text" cite={source}>
            {text}
          </blockquote>
        </div>
        <a className="news-card__ref hover-fade" href={link}>
          {source}
        </a>
      </article>
    </li>
  );
};

export default NewsCard;
