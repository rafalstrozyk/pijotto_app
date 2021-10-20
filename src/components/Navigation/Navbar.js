import { useContext } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useFirestore } from '../../contexts/FirestoreContext';
import { AppSatateContext } from '../../contexts/AppStateContext';
import PropTypes from 'prop-types';
import { appStateVars } from '../../unchangingVars';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Brightness7Icon from '@material-ui/icons/Brightness7';

import Menu from './Menu';

import { Container } from '../containers/flexbox';
import styled from 'styled-components';

const StyledContainerMenuItemsFlex = styled(Container)`
  > :first-child {
    margin-right: 10px;
  }
  .menu-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

function Navbar({ ...rest }) {
  const [state, dispatch] = useContext(AppSatateContext);
  const { currentUser } = useAuth();
  const { userPersonalData } = useFirestore();

  function handleTogleDarkMode() {
    dispatch({ type: appStateVars.DARK_MODE_TOGLE });
  }
  return (
    <div style={{ gridArea: 'navbar' }} {...rest}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Container jusContent="space-between" width="100%">
            <Typography variant="h6">Pijjotto</Typography>
            <StyledContainerMenuItemsFlex aliItems="center">
              {state.darkMode ? (
                <IconButton
                  color="secondary"
                  aria-label="off dark mode"
                  onClick={handleTogleDarkMode}
                >
                  <Brightness3Icon />
                </IconButton>
              ) : (
                <IconButton
                  color="secondary"
                  aria-label="on dark mode"
                  onClick={handleTogleDarkMode}
                >
                  <Brightness7Icon />
                </IconButton>
              )}
              {currentUser ? (
                <Typography variant="body1" color="secondary">
                  Hello{' '}
                  {currentUser && userPersonalData
                    ? userPersonalData.nick
                    : '...loading'}
                  !
                </Typography>
              ) : null}
              <Menu />
            </StyledContainerMenuItemsFlex>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  rest: PropTypes.any,
};

export default Navbar;
