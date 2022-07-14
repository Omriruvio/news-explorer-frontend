import { userActions } from '../contexts/AuthContext';

const initialUserState = {
  name: '',
  isLoggedIn: false,
};

const userReducer = (initialState = initialUserState, action) => {
  console.log('action: ', action);
  switch (action.type) {
    case userActions.signIn:
      return { ...initialState, ...action.payload };
    case userActions.signOut:
      return initialUserState;
    default:
      return initialUserState;
  }
};

export { userReducer, initialUserState };
