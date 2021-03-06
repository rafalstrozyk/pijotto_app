import SignUpForm from '../components/inputs/SignUpForm';
import ButtonLinkRouterDom from '../components/Buttons/BtnLinkRouterDom';
import { useWindowSize } from '../hooks/useWindowSize';

import { Typography } from '@material-ui/core';

import { Container } from '../components/containers/flexbox';
import StyledWrapperPosition from '../components/StyledComponents/StyledWrapperPosition';

function Register() {
  const size = useWindowSize();
  return (
    <StyledWrapperPosition>
      <Container
        width={size.width > 480 ? '60%' : '95%'}
        direction="column"
        jusContent="center"
        aliItems="center"
      >
        <Typography variant="h4" component="h4" color="primary">
          Sign Up
        </Typography>
        <SignUpForm />
      </Container>

      <ButtonLinkRouterDom
        color="primary"
        style={{ marginTop: '20px' }}
        link="/login"
      >
        log in
      </ButtonLinkRouterDom>
    </StyledWrapperPosition>
  );
}

export default Register;
