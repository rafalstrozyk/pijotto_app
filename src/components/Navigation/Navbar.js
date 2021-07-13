import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BtnRrdLink from '../Buttons/BtnRrdLink';
import { Container } from '../containers/flexbox';

export default function Navbar() {
  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <Container jusContent="space-between" width="100%">
            <Typography variant="h6">Pijjotto</Typography>
            <div>
              <BtnRrdLink link="/">Home</BtnRrdLink>
              <BtnRrdLink link="/login">Login</BtnRrdLink>
              <BtnRrdLink link="/register">Register</BtnRrdLink>
            </div>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
}
