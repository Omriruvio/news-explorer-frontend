import './AuthForm.css';

const AuthForm = () => {
  return (
    <div className="form__inputs-wrapper">
      <label className="form__label">
        Email
        <input name="email" className="form__input" type={'email'} placeholder={'Enter email'}></input>
      </label>
      <label className="form__label">
        Password
        <input name="password" className="form__input" type={'password'} placeholder={'Enter password'}></input>
      </label>
    </div>
  );
};

export default AuthForm;
