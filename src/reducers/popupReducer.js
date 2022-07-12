import { popupActions } from '../contexts/PopupContext';

const initialPopupState = {
  isUserMenuOpen: false,
  isSigninPopupOpen: false,
  isSignupPopupOpen: false,
  isSuccessPopupOpen: false,
};

const popupReducer = (popupState, action) => {
  switch (action) {
    case popupActions.closeAll:
      return initialPopupState;
    case popupActions.openSuccessPopup:
      return { ...popupState, isSuccessPopupOpen: true };
    case popupActions.closeSuccessPopup:
      return { ...popupState, isSuccessPopupOpen: false };
    case popupActions.openSignUpPopup:
      return { ...popupState, isSignupPopupOpen: true };
    case popupActions.closeSignUpPopup:
      return { ...popupState, isSignupPopupOpen: false };
    case popupActions.openSignInPopup:
      return { ...popupState, isSigninPopupOpen: true };
    case popupActions.closeSignInPopup:
      return { ...popupState, isSigninPopupOpen: false };
    case popupActions.toggleUserMenu:
      return { ...popupState, isUserMenuOpen: !popupState.isUserMenuOpen };
    case popupActions.closeUserMenu:
      return { ...popupState, isUserMenuOpen: false };
    case popupActions.openUserMenu:
      return { ...popupState, isUserMenuOpen: true };
    default:
      return popupState;
  }
};

export { popupReducer, initialPopupState };
