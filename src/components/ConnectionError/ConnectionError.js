import './ConnectionError.css';
import notFound from '../../images/not-found.svg';

const ConnectionError = () => {
  return (
    <section className='nothing-found__container'>
      <img className='nothing-found__image' src={notFound} alt='Sad face emoticon'></img>
      <span className='nothing-found__title'>Something went wrong</span>
      <span className='nothing-found__text'>
        Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.
      </span>
    </section>
  );
};

export default ConnectionError;
