import styled from 'styled-components';
import { ReactComponent as Svg1 } from '../svg/1.svg';
import { ReactComponent as Svg2 } from '../svg/2.svg';
import { ReactComponent as Svg3 } from '../svg/3.svg';

const StyledBackground = styled.div`
  color: transparent;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -100;
  width: 100vw;
  height: 100vh;
  * {
    position: absolute;
  }

  #svg1 {
    top: 55vh;
    left: -2%;
    width: 30vw;
  }
  #svg2 {
    width: 30vw;
    top: -10vh;
    right: -5%;
  }
  #svg3 {
    width: 18vw;
    top: 46vh;
    right: 0%;
  }
`;
const Background = () => (
  <StyledBackground>
    <Svg1 id="svg1" />
    <Svg2 id="svg2" />
    <Svg3 id="svg3" />
  </StyledBackground>
);

export default Background;
