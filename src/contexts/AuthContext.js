import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({ name: '', isLoggedIn: false });

  const signIn = (name) => setCurrentUser({ name, isLoggedIn: true });

  const signOut = () => setCurrentUser({ name: 'Elise', isLoggedIn: false });

  return (
    <>
      <AuthContext.Provider value={{ currentUser, signIn, signOut }}>{children}</AuthContext.Provider>
    </>
  );
};
