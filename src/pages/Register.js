import SignUpForm from '../components/inputs/SignUpForm';
import { Typography } from '@material-ui/core';
import { Container } from '../components/containers/flexbox';
import styled from 'styled-components';
import ButtonLinkRouterDom from '../components/Buttons/BtnLinkRouterDom';

const StyledPosition = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
`;

const StyledBox = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.main};
  padding: 20px;
  border-radius: 20px;
`;

export default function Register() {
  return (
    <StyledPosition>
      <StyledBox>
        <Container direction="column" jusContent="center" aliItems="center">
          <Container direction="column" jusContent="center" aliItems="center">
            <Typography variant="h4" component="h4">
              Sign Up
            </Typography>
            <SignUpForm />
          </Container>

          <ButtonLinkRouterDom
            color="secondary"
            style={{ marginTop: '20px' }}
            link="/login"
          >
            log in
          </ButtonLinkRouterDom>
        </Container>
      </StyledBox>
    </StyledPosition>
  );
}
