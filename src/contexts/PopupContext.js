import React from 'react';

const PopupContext = React.createContext();
PopupContext.displayName = 'Store';

export const usePopups = () => React.useContext(PopupContext);

export const PopupProvider = ({ children, initialState, reducer }) => {
  const [popupState, popupDispatch] = React.useReducer(reducer, initialState);

  return <PopupContext.Provider value={[popupState, popupDispatch]}>{children}</PopupContext.Provider>;
};
