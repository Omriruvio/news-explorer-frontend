import './ShowMoreButton.css';

const ShowMoreButton = ({ getNextCards }) => {
  return (
    <button type={'button'} className="search-results__show-more-button" onClick={getNextCards}>
      Show more
    </button>
  );
};

export default ShowMoreButton;
