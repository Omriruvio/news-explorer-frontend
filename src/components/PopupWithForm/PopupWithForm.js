import { usePopups } from '../../contexts/PopupContext';
import { popupActions } from '../../reducers/popupReducer';
import './PopupWithForm.css';

const PopupWithForm = (props) => {
  const { hideForm, name, title, onSubmit, children, buttonText, isOpen, isValid = true, redirectText, handleRedirect } = props;
  const buttonClassName = `form__submit-button ${!isValid ? 'form__submit-button_disabled' : ''}`;
  const [, popupDispatch] = usePopups();

  const handleClick = (e) => {
    const classList = e.target.classList;
    const isCloseEvent = classList.contains(`popup_type_${name}`) || classList.contains(`popup__close-button`);
    if (isCloseEvent) {
      popupDispatch(popupActions.closeAll);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <div onMouseDown={handleClick} className={`popup popup_type_${name} ${isOpen ? 'popup_active' : ''}`}>
      <div className="popup__window">
        <button type="button" className="popup__close-button" aria-label="close" onClick={handleClick}></button>
        <h2 className="popup__title">{title}</h2>
        {!hideForm && (
          <form onSubmit={handleSubmit} className={`form form_${name}`} name={name}>
            {children}
            <button disabled={!isValid} type="submit" className={buttonClassName}>
              {buttonText}
            </button>
          </form>
        )}
        <div className="form__redirect-wrapper" style={{ display: hideForm ? 'block' : 'flex' }}>
          {!hideForm && <span>or</span>}
          <nav>
            <button className="form__redirect-button" onClick={handleRedirect}>
              {redirectText}
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default PopupWithForm;
