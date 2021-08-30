import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { appStateVars } from '../unchangingVars';

const reducer = (state, action) => {
  switch (action.type) {
    case appStateVars.SCROLL_CHANGE:
      return {
        ...state,
        scroll: action.isScroll,
      };
    case appStateVars.ALLERT:
      if (action.isError) {
        return { ...state, message: action.message, isError: true };
      } else {
        return { ...state, message: action.message, isError: false };
      }
    case appStateVars.SHOW_ALLERT:
      return { ...state, isMessage: true };
    case appStateVars.DONT_SHOW_ALLERT:
      return { ...state, isMessage: false };
    default:
      return state;
  }
};

const initialState = {
  scroll: true,
  message: '',
  isMessage: false,
  isError: false,
};

export const AppSatateContext = createContext({
  state: initialState,
  dispatch: () => null,
});

export function AppStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppSatateContext.Provider value={[state, dispatch]}>
      {children}
    </AppSatateContext.Provider>
  );
}

AppStateProvider.propTypes = {
  children: PropTypes.any,
};
