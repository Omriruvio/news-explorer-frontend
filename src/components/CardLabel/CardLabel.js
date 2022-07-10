import './CardLabel.css';
import { useState } from 'react';
import useWindowSize from '../../hooks/UseWindowSize';
import bookmarkGrey from '../../images/bookmark-grey.svg';
import bookmarkBlue from '../../images/bookmark-blue.svg';
import bookmarkBlack from '../../images/bookmark-black.svg';
import trashButtonBlack from '../../images/trash-black.svg';
import trashButtonGrey from '../../images/trash-grey.svg';

const CardLabel = ({ typeRight = true, typeLeft = true, typePopup = true, icon = bookmarkGrey, alt = 'bookmark icon', text = 'Placeholder' }) => {
  const isDesktopSize = useWindowSize().width >= 1280;
  // const [bookmarkIcon /* setBookmarkIcon */] = useState(bookmarkGrey);
  // three label types:
  // Icon / Tag / Popup
  // handle tag overlap, possibly by hiding left tag when hover is on
  // popup on large displays only
  return (
    <>
      {typeRight && (
        <div className="label-contianer label-container_right">
          {typePopup && isDesktopSize && (
            <div className="label-container_popup">
              <span className="label-popup label-text">{text}</span>
            </div>
          )}
          <button className="label-button" type="button">
            <img className="label-icon" src={icon} alt={alt}></img>
          </button>
        </div>
      )}
      {typeLeft && (
        <div className="label-contianer label-container_left">
          <span className="label-text">{text}</span>
        </div>
      )}
    </>
  );
};

export default CardLabel;
