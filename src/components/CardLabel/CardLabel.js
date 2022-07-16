import './CardLabel.css';
import bookmarkGrey from '../../images/bookmark-grey.svg';
import bookmarkBlue from '../../images/bookmark-blue.svg';
import bookmarkBlack from '../../images/bookmark-black.svg';
import trashButtonBlack from '../../images/trash-black.svg';
import trashButtonGrey from '../../images/trash-grey.svg';
import { useInfo } from '../../contexts/UserContext';
import { useLocation } from 'react-router';
import { useState } from 'react';

const CardLabel = ({ isDeleted, text, isSaved, saveId, onBookmark, onTrashClick }) => {
  const isArticles = useLocation().pathname === '/saved-articles';
  const [trashIcon, setTrashIcon] = useState(trashButtonGrey);
  const [bookmarkIcon, setBookmarkIcon] = useState(bookmarkGrey);
  const { currentUser } = useInfo();

  return (
    <>
      {!isArticles && (
        <div className='label-contianer label-container_right'>
          {!currentUser.isLoggedIn && (
            <div className='label-container_popup'>
              <span className='label-popup label-text'>Sign in to save articles</span>
            </div>
          )}
          <button
            onClick={onBookmark}
            onMouseEnter={() => !isSaved && setBookmarkIcon(bookmarkBlack)}
            onMouseLeave={() => !isSaved && setBookmarkIcon(bookmarkGrey)}
            className='label-button'
            type='button'
          >
            <img className='label-icon' src={!isDeleted && (saveId || isSaved) ? bookmarkBlue : bookmarkIcon} alt={'Bookmark icon'}></img>
          </button>
        </div>
      )}
      {isArticles && (
        <>
          <div className='label-contianer label-container_right'>
            <div className='label-container_popup'>
              <span className='label-popup label-text'>Remove from saved</span>
            </div>
            <button
              onClick={onTrashClick}
              onMouseEnter={() => setTrashIcon(trashButtonBlack)}
              onMouseLeave={() => setTrashIcon(trashButtonGrey)}
              className='label-button'
              type='button'
            >
              <img className='label-icon' src={trashIcon} alt={'Trash icon'}></img>
            </button>
          </div>
        </>
      )}
      {isArticles && (
        <div className='label-contianer label-container_left'>
          <span className='label-text'>{text}</span>
        </div>
      )}
    </>
  );
};

export default CardLabel;
