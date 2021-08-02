import SignUpForm from '../components/inputs/SignUpForm';
import { Paper, Typography } from '@material-ui/core';
import { Container } from '../components/containers/flexbox';
import styled from 'styled-components';
import ButtonLinkRouterDom from '../components/Buttons/BtnLinkRouterDom';

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

export default function Register() {
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
                Sign Up
              </Typography>
              <SignUpForm />
            </Container>
          </StyledPaper>
          <ButtonLinkRouterDom
            color="primary"
            style={{ marginTop: '20px' }}
            link="/login"
          >
            sign in
          </ButtonLinkRouterDom>
        </Container>
      </StyledPosition>
    </Container>
  );
}
