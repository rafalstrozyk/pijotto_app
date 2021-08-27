import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container } from './containers/flexbox';
import { AppSatateContext } from '../contexts/AppStateContext';
import { CSSTransition } from 'react-transition-group';
import ErrorIcon from '@material-ui/icons/Error';
import { Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const StyledAllert = styled(Container)`
  z-index: 500000;
  position: fixed;
  bottom: 5%;
  right: 5%;
  .message-show-enter {
    opacity: 0;
  }
  .message-show-enter-active {
    opacity: 1;
    transition: opacity 300ms;
  }
  .message-show-exit {
    opacity: 1;
  }
  .message-show-exit-active {
    opacity: 0;
    transition: opacity 300ms;
  }
`;

const StyledMessageWrapper = styled(Container)`
  background-color: ${({ isError }) =>
    isError ? 'rgba(245, 84, 72, 0.6)' : 'rgba(101, 186, 104, 0.6)'};
  padding: 10px;
  border: 1px solid ${({ isError }) => (isError ? '#f55448' : '#65ba68')};
  border-radius: 10px;
  max-width: 300px;
  > *:first-child {
    margin-right: 5px;
  }
`;

export default function Allert() {
  const [state] = useContext(AppSatateContext);
  const [show, setShow] = useState(state.isMessage);
  // useEffect(() => {
  //   setShow(state.isMessage);
  // }, [setShow, state.isMessage]);
  return (
    <StyledAllert jusContent="center">
      <CSSTransition
        in={state.isMessage}
        timeout={400}
        classNames="message-show"
        unmountOnExit
      >
        <StyledMessageWrapper
          isError={state.isError}
          jusContent="center"
          aliItems="center"
        >
          {state.isError ? (
            <ErrorIcon color="error" />
          ) : (
            <CheckCircleIcon color="action" />
          )}
          <Typography variant="body2">{state.message}</Typography>
        </StyledMessageWrapper>
      </CSSTransition>
    </StyledAllert>
  );
}
