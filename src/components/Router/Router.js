import { BrowserRouter } from 'react-router-dom';

import Root from './Root';

const Router = ({ children }) => (
  <BrowserRouter>
    {children}
    <div style={{marginTop: '100px'}}>
    <Root />
    </div>
  </BrowserRouter>
);

export default Router;
