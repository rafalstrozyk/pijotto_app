import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  flex-direction: ${(props) => props.direction};
  flex-wrap: ${(props) => props.wrap};
  justify-content: ${(props) => props.jusContent};
  align-items: ${(props) => props.aliItems};
  align-content: ${(props) => props.aliContent};
`;

export const Item = styled.div`
  order: ${(props) => props.order};
  flex-grow: ${(props) => props.grow};
  flex-shrink: ${(props) => props.shrink};
  align-self: ${(props) => props.alignSelf};
`;
