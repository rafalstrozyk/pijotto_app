import LoginForm from '../components/inputs/LogInForm';
import { Typography } from '@material-ui/core';
import { Container } from '../components/containers/flexbox';
import ButtonLinkRouterDom from '../components/Buttons/BtnLinkRouterDom';
import { useWindowSize } from '../hooks/useWindowSize';
import StyledWrapperPosition from '../components/StyledComponents/StyledWrapperPosition';

export default function Login() {
  const size = useWindowSize();
  return (
    <StyledWrapperPosition>
      <Container
        width={size.width > 480 ? '60%' : '90%'}
        direction="column"
        jusContent="center"
        aliItems="center"
      >
        <Typography variant="h4" component="h4">
          Login
        </Typography>
        <LoginForm />
      </Container>
      <ButtonLinkRouterDom
        color="secondary"
        style={{ marginTop: '20px' }}
        link="/register"
      >
        create an account
      </ButtonLinkRouterDom>
    </StyledWrapperPosition>
  );
}
