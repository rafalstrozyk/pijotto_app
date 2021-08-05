import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BtnRrdLink from '../Buttons/BtnRrdLink';
import { Container } from '../containers/flexbox';
import { useAuth } from '../../contexts/AuthContext';
import { useFirestore } from '../../contexts/FirestoreContext';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const { userPersonalData } = useFirestore();

  function handleLogout() {
    logout();
  }
  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Container jusContent="space-between" width="100%">
            <Typography variant="h6">Pijjotto</Typography>
            <div>
              {!currentUser ? (
                <>
                  <BtnRrdLink link="/login">Login</BtnRrdLink>
                  <BtnRrdLink link="/register">Register</BtnRrdLink>
                </>
              ) : (
                <>
                  <BtnRrdLink link="/">Home</BtnRrdLink>

                  <BtnRrdLink link="/user">
                    {userPersonalData ? userPersonalData.nick : '...loading'}
                  </BtnRrdLink>
                  <Button
                    onClick={handleLogout}
                    size="small"
                    variant="contained"
                    color="secondary"
                  >
                    Logout
                  </Button>
                </>
              )}
            </div>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
}
