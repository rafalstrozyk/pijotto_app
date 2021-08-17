import styled from 'styled-components';
import { useRef } from 'react';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

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
  > * {
    margin-top: 10vh;
  }
`;

export default function Modal({ children, open, setOpen }) {
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
