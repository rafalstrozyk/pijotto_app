import { useContext } from 'react';

import { AppSatateContext } from '../contexts/AppStateContext';
import { GlobalStyle } from '../style/globalStyle';

const ContainerStateForGlobalStyle = () => {
  const [state] = useContext(AppSatateContext);
  return <GlobalStyle state={state} />;
};

export default ContainerStateForGlobalStyle;
