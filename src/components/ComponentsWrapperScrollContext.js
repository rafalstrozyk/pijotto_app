import { useContext } from "react";

import { AppSatateContext } from "../contexts/AppStateContext";
import { GlobalStyle } from "../style/globalStyle";

const ComponentsWrapperScrollContext = () => {
  const [state] = useContext(AppSatateContext);
  return <GlobalStyle state={state} />;
};

export default ComponentsWrapperScrollContext;
