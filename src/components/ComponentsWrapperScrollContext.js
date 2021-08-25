import { useContext } from 'react';
import { ScrollContext } from '../contexts/ScrollContext';
import { GlobalStyle } from '../style/globalStyle';
const ComponentsWrapperScrollContext = () => {
    const [state] = useContext(ScrollContext);
  return (<GlobalStyle state={state}/>);
};

export default ComponentsWrapperScrollContext;
