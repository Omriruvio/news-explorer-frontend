import './ShowMoreButton.css';

const ShowMoreButton = ({ getNextCards }) => {
  return (
    <button type={'button'} className="show-more" onClick={getNextCards}>
      Show more
    </button>
  );
};

export default ShowMoreButton;
