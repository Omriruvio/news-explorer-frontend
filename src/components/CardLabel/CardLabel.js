import './CardLabel.css';
import bookmarkGrey from '../../images/bookmark-grey.svg';
import bookmarkBlue from '../../images/bookmark-blue.svg';
import bookmarkBlack from '../../images/bookmark-black.svg';
import trashButtonBlack from '../../images/trash-black.svg';
import trashButtonGrey from '../../images/trash-grey.svg';
import { useInfo } from '../../contexts/UserContext';
import { useLocation } from 'react-router';
import { useState } from 'react';
import { usePopups, popupActions } from '../../contexts/PopupContext';

const CardLabel = ({ text, isSaved, isFreshSave, onBookmark, removeBookmark, onTrashClick }) => {
  const isArticles = useLocation().pathname === '/saved-articles';
  const [trashIcon, setTrashIcon] = useState(trashButtonGrey);
  const [bookmarkIcon, setBookmarkIcon] = useState(bookmarkGrey);
  const { currentUser } = useInfo();
  const [, popupDispatch] = usePopups();

  const handleBookmarkClick = () => {
    if (!currentUser.isLoggedIn) {
      popupDispatch(popupActions.openSignUpPopup);
    } else if (isSaved || isFreshSave) {
      removeBookmark();
    } else onBookmark();
  };

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
            onClick={handleBookmarkClick}
            onMouseEnter={() => !isSaved && !isFreshSave && setBookmarkIcon(bookmarkBlack)}
            onMouseLeave={() => !isSaved && !isFreshSave && setBookmarkIcon(bookmarkGrey)}
            className='label-button'
            type='button'
          >
            <img className='label-icon' src={isSaved || isFreshSave ? bookmarkBlue : bookmarkIcon} alt={'Bookmark icon'}></img>
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
