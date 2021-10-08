import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Root from './Root';

const Router = ({ children }) => (
  <BrowserRouter>
    {children}
    <div style={{ marginTop: '100px' }}>
      <Root />
    </div>
  </BrowserRouter>
);

Router.propTypes = {
  children: PropTypes.any,
};

export default Router;
