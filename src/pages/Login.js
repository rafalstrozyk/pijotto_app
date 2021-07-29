import LoginForm from '../components/inputs/LogInForm';
import { Paper, Typography } from '@material-ui/core';
import { Container } from '../components/containers/flexbox';
import styled from 'styled-components';
const StyledPaper = styled(Paper)`
  padding: 20px;
  position: absolute;
  top: 25%;
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
      <StyledPaper>
        <Container direction="column" jusContent="center" aliItems="center">
          <Typography variant="h4" component="h4">
            Login
          </Typography>
          <LoginForm />
        </Container>
      </StyledPaper>
    </Container>
  );
}
