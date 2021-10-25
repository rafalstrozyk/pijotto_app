import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Container } from '../containers/flexbox';

const StyledBox = styled.div`
  background-color: ${({ theme }) => theme.palette.secondary.main};
  width: 100vw;

  @media handheld, only screen and (min-width: 480px) {
    padding: 20px;
    border-radius: 20px;
    max-width: 500px;
  }
`;
function StyledWrapperPosition({ children }) {
  return (
    <Container width="100%" jusContent="center" aliItes="center">
      <StyledBox>
        <Container direction="column" jusContent="center" aliItems="center">
          {children}
        </Container>
      </StyledBox>
    </Container>
  );
}

StyledWrapperPosition.propTypes = {
  children: PropTypes.any,
};

export default StyledWrapperPosition;
