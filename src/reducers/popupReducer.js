const initialPopupState = {
  isUserMenuOpen: false,
  isSigninPopupOpen: false,
  isSignupPopupOpen: false,
  isSuccessPopupOpen: false,
};

const popupReducer = (popupState, action) => {
  switch (action.type) {
    case 'close all popups':
      return initialPopupState;
    case 'open success popup':
      return { ...popupState, isSuccessPopupOpen: true };
    case 'close success popup':
      return { ...popupState, isSuccessPopupOpen: false };
    case 'open signup popup':
      return { ...popupState, isSignupPopupOpen: true };
    case 'close signup popup':
      return { ...popupState, isSignupPopupOpen: false };
    case 'open signin popup':
      return { ...popupState, isSigninPopupOpen: true };
    case 'close signin popup':
      return { ...popupState, isSigninPopupOpen: false };
    case 'toggle user menu':
      return { ...popupState, isUserMenuOpen: !popupState.isUserMenuOpen };
    case 'close user menu':
      return { ...popupState, isUserMenuOpen: false };
    case 'open user menu':
      return { ...popupState, isUserMenuOpen: true };
    default:
      return popupState;
  }
};

export { popupReducer, initialPopupState };
