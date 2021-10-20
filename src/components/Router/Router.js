import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Root from './Root';

const Router = ({ children }) => (
  <BrowserRouter>
    <div style={{ gridArea: 'content' }}>
      <Root />
    </div>
    {children}
  </BrowserRouter>
);

Router.propTypes = {
  children: PropTypes.any,
};

export default Router;
