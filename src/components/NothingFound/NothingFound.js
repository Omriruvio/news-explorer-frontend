import './NothingFound.css';
import notFound from '../../images/not-found.svg';

const NothingFound = () => {
  return (
    <section className="nothing-found__container">
      <img className="nothing-found__image" src={notFound} alt="Sad face emoticon"></img>
      <span className="nothing-found__title">Nothing found</span>
      <span className="nothing-found__text">Sorry, but nothing matched your search terms.</span>
    </section>
  );
};

export default NothingFound;
