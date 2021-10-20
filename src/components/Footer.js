import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Container } from './containers/flexbox';
import { useAuth } from '../contexts/AuthContext';
import BtnLinkRouterDom from './Buttons/BtnLinkRouterDom';
import BtnRrdLink from './Buttons/BtnRrdLink';

const StyledFooter = styled.footer`
  grid-area: footer;
  margin-top: 20px;
  width: 100%;
  height: 200px;
  background-color: ${({ theme }) => theme.palette.primary.dark};
`;

function Footer() {
  const { logout } = useAuth();
  return (
    <StyledFooter>
      <Container
        aliItems="center"
        jusContent="center"
        direction="column"
        width="100%"
        height="100%"
      >
        <Container
          jusContent="space-evenly"
          aliItems="center"
          width="80vw"
          height="80%"
        >
          <Typography variant="h5">Pijjotto</Typography>
          <Container wrap width="40vw">
            <BtnLinkRouterDom color="secondary" link="/">
              Home
            </BtnLinkRouterDom>
            <BtnLinkRouterDom color="secondary" link="/user">
              User profile
            </BtnLinkRouterDom>
            <BtnLinkRouterDom color="secondary" link="/register">
              Register
            </BtnLinkRouterDom>
            <BtnLinkRouterDom color="secondary" link="/login">
              Login
            </BtnLinkRouterDom>
            <BtnRrdLink
              color="secondary"
              functionOnClick={logout}
              link="/login"
            >
              logout
            </BtnRrdLink>
          </Container>
        </Container>
        <Typography variant="body2" color="secondary">
          Created by{' '}
          <Link
            color="textPrimary"
            href="https://github.com/rafalstrozyk"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rafał Stróżyk
          </Link>
        </Typography>
      </Container>
    </StyledFooter>
  );
}

export default Footer;
