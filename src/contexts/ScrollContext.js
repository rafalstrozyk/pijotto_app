import { createContext, useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'change':
      return {
        ...state,
        scroll: action.isScroll,
      };

    default:
      return state;
  }
};

const initialState = {
  scroll: true,
};

export const ScrollContext = createContext({
  state: initialState,
  dispatch: () => null,
});

export function ScrollProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ScrollContext.Provider value={[state, dispatch]}>
      {children}
    </ScrollContext.Provider>
  );
}
