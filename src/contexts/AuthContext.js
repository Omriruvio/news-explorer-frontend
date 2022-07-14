import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();
AuthContext.displayName = 'Auth';

export const useAuth = () => useContext(AuthContext);

export const userActions = {
  signIn: 'signIn',
  signOut: 'signOut',
};
// const initialState = {
//   name: '',
//   isLoggedIn: false,
// };

export const AuthProvider = ({ children, initialState, reducer }) => {
  const [currentUser, currentUserDispatch] = useReducer(reducer, initialState);

  return <AuthContext.Provider value={{ currentUser, currentUserDispatch }}>{children}</AuthContext.Provider>;
};

// export const AuthProvider = ({ children }) => {
//   // const [currentUser, setCurrentUser] = useState({ name: '', isLoggedIn: false });

//   // const signIn = useCallback((name) => setCurrentUser({ name, isLoggedIn: true }), []);

//   // const signOut = useCallback(() => setCurrentUser({ name: '', isLoggedIn: false }), []);

//   return <AuthContext.Provider value={{ currentUser, signIn, signOut }}>{children}</AuthContext.Provider>;
// };
