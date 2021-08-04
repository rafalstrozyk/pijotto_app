import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BtnRrdLink from '../Buttons/BtnRrdLink';
import { Container } from '../containers/flexbox';
import { useAuth } from '../../contexts/AuthContext';
import { useFirestore } from '../../contexts/FirestoreContext';

export default function Navbar() {
  const { currentUser } = useAuth();
  const { userPersonalData } = useFirestore();
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
                </>
              )}
            </div>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
}
