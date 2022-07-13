import { createContext, useCallback, useContext, useState } from 'react';

const AuthContext = createContext();
AuthContext.displayName = 'Auth';

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({ name: '', isLoggedIn: false });

  const signIn = useCallback((name) => setCurrentUser({ name, isLoggedIn: true }), []);

  const signOut = useCallback(() => setCurrentUser({ name: '', isLoggedIn: false }), []);

  return <AuthContext.Provider value={{ currentUser, signIn, signOut }}>{children}</AuthContext.Provider>;
};
