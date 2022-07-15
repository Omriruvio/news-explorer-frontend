import { createContext, useCallback, useContext, useState } from 'react';
import { sortByRelevance } from '../utils/sortByRelevance.ts';

const UserContext = createContext();
UserContext.displayName = 'User';

export const useInfo = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({ name: '', isLoggedIn: false });
  const [savedCards, setSavedCards] = useState([]);

  const setAndSortSavedCards = useCallback((cards) => setSavedCards(sortByRelevance(cards)), []);

  const signIn = useCallback((name) => setCurrentUser({ name, isLoggedIn: true }), []);

  const signOut = useCallback(() => setCurrentUser({ name: '', isLoggedIn: false }), []);

  return (
    <UserContext.Provider
      value={{
        savedCards,
        setAndSortSavedCards,
        currentUser,
        signIn,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
