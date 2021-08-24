import LoginForm from '../components/inputs/LogInForm';
import { Typography } from '@material-ui/core';
import { Container } from '../components/containers/flexbox';
import ButtonLinkRouterDom from '../components/Buttons/BtnLinkRouterDom';
import styled from 'styled-components';
import { useWindowSize } from '../hooks/useWindowSize';
const StyledPosition = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledBox = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.main};
  width: 100vw;

  @media only screen and (min-width: 480px) {
    padding: 20px;
    border-radius: 20px;
    max-width: 500px;
  }
`;

export default function Login() {
  const size = useWindowSize();
  return (
    <StyledPosition>
      <StyledBox>
        <Container direction="column" jusContent="center" aliItems="center">
          <Container
            width={size.width > 480 ? '60%' : '100%'}
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
        </Container>
      </StyledBox>
    </StyledPosition>
  );
}
