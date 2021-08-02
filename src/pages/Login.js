import LoginForm from '../components/inputs/LogInForm';
import { Paper, Typography } from '@material-ui/core';
import { Container } from '../components/containers/flexbox';
import ButtonLinkRouterDom from '../components/Buttons/BtnLinkRouterDom';
import styled from 'styled-components';

const StyledPaper = styled(Paper)`
  padding: 20px;
`;

const StyledPosition = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
`;

export default function Login() {
  return (
    <Container
      styles={{ position: 'relative' }}
      width="100%"
      height="100%"
      direction="column"
      jusContent="center"
      aliItems="center"
    >
      <StyledPosition>
        <Container direction="column" jusContent="center" aliItems="center">
          <StyledPaper>
            <Container direction="column" jusContent="center" aliItems="center">
              <Typography variant="h4" component="h4">
                Login
              </Typography>
              <LoginForm />
            </Container>
          </StyledPaper>
          <ButtonLinkRouterDom
            color="primary"
            style={{ marginTop: '20px' }}
            link="/register"
          >
            create an account
          </ButtonLinkRouterDom>
        </Container>
      </StyledPosition>
    </Container>
  );
}
