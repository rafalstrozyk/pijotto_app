import { useAuth } from '../../contexts/AuthContext';
import { useFirestore } from '../../contexts/FirestoreContext';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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

export default function Navbar({ ...rest }) {
  const { currentUser } = useAuth();
  const { userPersonalData } = useFirestore();
  return (
    <div {...rest}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Container jusContent="space-between" width="100%">
            <Typography variant="h6">Pijjotto</Typography>
            <StyledContainerMenuItemsFlex aliItems="center">
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
