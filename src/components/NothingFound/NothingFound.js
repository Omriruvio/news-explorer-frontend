import './NothingFound.css';
import notFound from '../../images/not-found.svg';

const NothingFound = () => {
  return (
    <section className='connection-error__container'>
      <img className='connection-error__image' src={notFound} alt='Sad face emoticon'></img>
      <span className='connection-error__title'>Nothing found</span>
      <span className='connection-error__text'>Sorry, but nothing matched your search terms.</span>
    </section>
  );
};

export default NothingFound;
