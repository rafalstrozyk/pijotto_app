import { useRef } from 'react';
import PropTypes from 'prop-types';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

import styled from 'styled-components';

const StyledModal = styled.div`
  position: fixed;
  z-index: 5000;
  background-color: rgba(34, 34, 34, 0.5);
  width: 100vw;
  height: 100vh;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  > * {
    @media handheld, only screen and (min-width: 850px) {
      margin-top: 15vh;
    }
  }
`;

function Modal({ children, open, setOpen }) {
  const ref = useRef();
  useOnClickOutside(ref, () => setOpen(false));

  return (
    <>
      {open && (
        <StyledModal>
          <div ref={ref}>{children}</div>
        </StyledModal>
      )}
    </>
  );
}

Modal.propTypes = {
  children: PropTypes.any,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default Modal;
