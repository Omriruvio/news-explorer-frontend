import './PopupWithForm.css';
import { cloneElement } from 'react';
import { usePopups, popupActions } from '../../contexts/PopupContext';

const PopupWithForm = (props) => {
  const { hideForm, name, title, /* onSubmit, */ children, /*  buttonText, */ isOpen, redirectText, handleRedirect } = props;
  const [, popupDispatch] = usePopups();

  const handleClick = (e) => {
    const classList = e.target.classList;
    const isCloseEvent = classList.contains(`popup_type_${name}`) || classList.contains(`popup__close-button`);
    if (isCloseEvent) {
      popupDispatch(popupActions.closeAll);
    }
  };

  return (
    <div onMouseDown={handleClick} className={`popup popup_type_${name} ${isOpen ? 'popup_active' : ''}`}>
      <div className="popup__window">
        <button type="button" className="popup__close-button" aria-label="close" onClick={handleClick}></button>
        <h2 className="popup__title">{title}</h2>
        {!hideForm && cloneElement(children, props)}
        <div className="form__redirect-wrapper" style={{ display: hideForm ? 'block' : 'flex' }}>
          {!hideForm && <span>or</span>}
          <nav>
            <button className="form__redirect-button hover-fade" onClick={handleRedirect}>
              {redirectText}
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PopupWithForm;
