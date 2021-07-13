import { BrowserRouter } from 'react-router-dom';

import Root from './Root';

const Router = ({ children }) => (
  <BrowserRouter>
    {children}
    <Root />
  </BrowserRouter>
);

export default Router;
