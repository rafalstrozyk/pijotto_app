import styled from 'styled-components';
import { Container } from '../containers/flexbox';

const StyledContainerPosts = styled(Container)`
  > * {
    margin-top: 10px;
    @media only screen and (min-width: 480px) {
      margin-top: 30px;
      margin-left: 10px;
      margin-right: 10px;
    }
  }
`;

export default StyledContainerPosts;
