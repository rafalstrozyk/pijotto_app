import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Container } from '../containers/flexbox';

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

export default function StyledWrapperPosition({ children }) {
  return (
    <StyledPosition>
      <StyledBox>
        <Container direction="column" jusContent="center" aliItems="center">
          {children}
        </Container>
      </StyledBox>
    </StyledPosition>
  );
}

StyledWrapperPosition.propTypes = {
  children: PropTypes.any,
};
