import { createContext, useContext, useReducer } from 'react';

const PopupContext = createContext();
PopupContext.displayName = 'Popups';

export const popupActions = {
  closeAll: 'close all popups',
  openUserMenu: 'open user menu',
  closeUserMenu: 'close user menu',
  toggleUserMenu: 'toggle user menu',
  closeSignInPopup: 'close signin popup',
  openSignInPopup: 'open signin popup',
  openSignUpPopup: 'open signup popup',
  closeSignUpPopup: 'close signup popup',
  openSuccessPopup: 'open success popup',
  closeSuccessPopup: 'close success popup',
};

export const usePopups = () => useContext(PopupContext);

export const PopupProvider = ({ children, initialState, reducer }) => {
  const [popupState, popupDispatch] = useReducer(reducer, initialState);

  return <PopupContext.Provider value={[popupState, popupDispatch]}>{children}</PopupContext.Provider>;
};
