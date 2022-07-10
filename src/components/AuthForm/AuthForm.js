import { useInputsAndValidation } from '../../hooks/UseInputsAndValidation';
import './AuthForm.css';

const AuthForm = ({ formName, onSubmit, buttonText, withNameField, responseError }) => {
  const { inputs, errors, isValid, handleChange } = useInputsAndValidation();
  const handleSubmit = (e) => {
    // Temporary, pre API handler
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className={`form form_${formName}`} name={formName}>
      <div className="form__inputs-wrapper">
        <label className="form__label">
          Email
          <input
            value={inputs.email || ''}
            onChange={handleChange}
            name="email"
            className="form__input"
            type={'email'}
            placeholder={'Enter email'}
            required
          ></input>
        </label>
        <span className="form__input-error">{errors.email}</span>
        <label className="form__label">
          Password
          <input
            value={inputs.password || ''}
            onChange={handleChange}
            name="password"
            className="form__input"
            type={'password'}
            placeholder={'Enter password'}
            minLength="6"
            required
          ></input>
        </label>
        <span className="form__input-error">{errors.password}</span>
        {withNameField && (
          <>
            <label className="form__label">
              Username
              <input
                value={inputs.username || ''}
                onChange={handleChange}
                name="username"
                className="form__input"
                type={'string'}
                placeholder={'Enter your username'}
                minLength="2"
                required
              ></input>
            </label>
            <span className="form__input-error">{errors.username}</span>
          </>
        )}
      </div>
      {responseError && <span className="form__response-error">{responseError}</span>}
      <button disabled={!isValid} type="submit" className={'form__submit-button'}>
        {buttonText}
      </button>
    </form>
  );
};

export default AuthForm;
