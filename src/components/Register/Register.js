import PopupWithForm from '../PopupWithForm/PopupWithForm';
import AuthForm from '../AuthForm/AuthForm';
import { usePopups } from '../../contexts/PopupContext';

const Register = ({ handleSignup, showSignIn, responseError }) => {
  const [popupState] = usePopups();
  return (
    <PopupWithForm
      withNameField
      isOpen={popupState.isSignupPopupOpen}
      onSubmit={handleSignup}
      isValid={true}
      formName='signup'
      title='Sign up'
      buttonText='Sign up'
      redirectText='Sign in'
      handleRedirect={showSignIn}
      responseError={responseError}
    >
      <AuthForm />
    </PopupWithForm>
  );
};

export default Register;
