import './CardLabel.css';
import bookmarkGrey from '../../images/bookmark-grey.svg';
import bookmarkBlue from '../../images/bookmark-blue.svg';
import bookmarkBlack from '../../images/bookmark-black.svg';
import trashButtonBlack from '../../images/trash-black.svg';
import trashButtonGrey from '../../images/trash-grey.svg';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'react-router';
import { useState } from 'react';
import { usePopups, popupActions } from '../../contexts/PopupContext';

const CardLabel = ({ text, isSaved, onBookmark, onTrashClick }) => {
  const isArticles = useLocation().pathname === '/saved-articles';
  const [trashIcon, setTrashIcon] = useState(trashButtonGrey);
  const [newSaved, setNewSaved] = useState(false);
  const [bookmarkIcon, setBookmarkIcon] = useState(bookmarkGrey);
  const { currentUser } = useAuth();
  const [, popupDispatch] = usePopups();

  const handleBookmarkClick = () => {
    if (!currentUser.isLoggedIn) {
      popupDispatch(popupActions.openSignUpPopup);
      return;
    }

    onBookmark()
      .then(() => {
        setBookmarkIcon(bookmarkBlue);
        setNewSaved(true);
      })
      .catch((err) => console.log(err));
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
            onMouseEnter={() => !isSaved && !newSaved && setBookmarkIcon(bookmarkBlack)}
            onMouseLeave={() => !isSaved && !newSaved && setBookmarkIcon(bookmarkGrey)}
            className='label-button'
            type='button'
          >
            <img className='label-icon' src={isSaved ? bookmarkBlue : bookmarkIcon} alt={'Bookmark icon'}></img>
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
