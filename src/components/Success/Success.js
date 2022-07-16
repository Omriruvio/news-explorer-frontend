import { usePopups } from '../../contexts/PopupContext';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

const Success = ({ showSignIn }) => {
  const [popupState] = usePopups();
  return (
    <PopupWithForm
      hideForm={true}
      formName='success'
      isOpen={popupState.isSuccessPopupOpen}
      title='Registration successfully completed!'
      redirectText='Sign in'
      handleRedirect={showSignIn}
    ></PopupWithForm>
  );
};

export default Success;
