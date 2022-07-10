import { createContext, useContext, useReducer } from 'react';

const PopupContext = createContext();
PopupContext.displayName = 'Store';

export const popupActions = {
  closeAll: { type: 'close all popups' },
  openUserMenu: { type: 'open user menu' },
  closeUserMenu: { type: 'close user menu' },
  toggleUserMenu: { type: 'toggle user menu' },
  closeSignInPopup: { type: 'close signin popup' },
  openSignInPopup: { type: 'open signin popup' },
  openSignUpPopup: { type: 'open signup popup' },
  closeSignUpPopup: { type: 'close signup popup' },
  openSuccessPopup: { type: 'open success popup' },
  closeSuccessPopup: { type: 'close success popup' },
};

export const usePopups = () => useContext(PopupContext);

export const PopupProvider = ({ children, initialState, reducer }) => {
  const [popupState, popupDispatch] = useReducer(reducer, initialState);

  return <PopupContext.Provider value={[popupState, popupDispatch]}>{children}</PopupContext.Provider>;
};
