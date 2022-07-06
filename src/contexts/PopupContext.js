import { createContext, useContext, useReducer } from 'react';

const PopupContext = createContext();
PopupContext.displayName = 'Store';

export const usePopups = () => useContext(PopupContext);

export const PopupProvider = ({ children, initialState, reducer }) => {
  const [popupState, popupDispatch] = useReducer(reducer, initialState);

  return <PopupContext.Provider value={[popupState, popupDispatch]}>{children}</PopupContext.Provider>;
};
