const initialPopupState = {
  isEditAvatarPopupOpen: false,
  isEditProfilePopupOpen: false,
  isAddPlacePopupOpen: false,
  isConfirmPopupOpen: false,
  isAuthOkPopupOpen: false,
  isAuthErrPopupOpen: false,
  isUserMenuOpen: false,
};

const popupActions = {
  closeAll: { type: 'close all popups' },
  openUserMenu: { type: 'open user menu' },
  closeUserMenu: { type: 'close user menu' },
  toggleUserMenu: { type: 'toggle user menu' },
};

const popupReducer = (popupState, action) => {
  switch (action.type) {
    case 'close all popups':
      return initialPopupState;
    case 'toggle user menu':
      return { ...popupState, isUserMenuOpen: !popupState.isUserMenuOpen };
    case 'close user menu':
      return { ...popupState, isUserMenuOpen: false };
    case 'open user menu':
      return { ...popupState, isUserMenuOpen: true };
    case 'open edit avatar':
      return { ...popupState, isEditAvatarPopupOpen: true };
    case 'open edit profile':
      return { ...popupState, isEditProfilePopupOpen: true };
    case 'open add place':
      return { ...popupState, isAddPlacePopupOpen: true };
    case 'open delete confirm':
      return { ...popupState, isConfirmPopupOpen: true };
    case 'open auth ok':
      return { ...popupState, isAuthOkPopupOpen: true };
    case 'open auth err':
      return { ...popupState, isAuthErrPopupOpen: true };
    case 'close edit avatar':
      return { ...popupState, isEditAvatarPopupOpen: false };
    case 'close edit profile':
      return { ...popupState, isEditProfilePopupOpen: false };
    case 'close add place':
      return { ...popupState, isAddPlacePopupOpen: false };
    case 'close delete confirm':
      return { ...popupState, isConfirmPopupOpen: false };
    case 'close auth ok':
      return { ...popupState, isAuthOkPopupOpen: false };
    case 'close auth err':
      return { ...popupState, isAuthErrPopupOpen: false };
    default:
      return popupState;
  }
};

export { popupReducer, popupActions, initialPopupState };
