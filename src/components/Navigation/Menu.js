import IconButton from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import styled from 'styled-components';
import { useState, useRef } from 'react';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import BtnRrdLink from '../Buttons/BtnRrdLink';
import { useAuth } from '../../contexts/AuthContext';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { CSSTransition } from 'react-transition-group';

const StyledMenu = styled.div`
  position: relative;
  .is-open-menu-enter {
    opacity: 0;
  }
  .is-open-menu-enter-active {
    opacity: 1;
    transition: opacity 200ms;
  }
  .is-open-menu-exit {
    opacity: 1;
  }
  .is-open-menu-exit-active {
    opacity: 0;
    transition: opacity 200ms;
  }
  ul {
    position: absolute;
    background-color: ${({ theme }) => theme.palette.secondary.main};
    border: 1px solid ${({ theme }) => theme.palette.secondary.light};
    border-radius: 10px;
    width: 100px;
    top: 110%;
    left: -40%;
    list-style: none;
    box-shadow: 2px 2px 12px 0px ${({ theme }) => theme.palette.secondary.light};
    li {
      width: 100%;
    }
  }
`;

export default function Menu() {
  const { currentUser, logout } = useAuth();
  const ref = useRef();
  const nodeRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <StyledMenu ref={ref}>
      <IconButton onClick={() => setIsOpen(!isOpen)} color="secondary">
        <MenuIcon />
      </IconButton>
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="is-open-menu"
        unmountOnExit
        nodeRef={nodeRef}
      >
        <ul ref={nodeRef}>
          {currentUser ? (
            <>
              <li>
                <BtnRrdLink
                  functionOnClick={() => setIsOpen(false)}
                  link="/"
                  size="small"
                  style={{ width: '100%' }}
                  color="primary"
                  startIcon={<HomeIcon />}
                >
                  Home
                </BtnRrdLink>
              </li>
              <li>
                <BtnRrdLink
                  functionOnClick={() => setIsOpen(false)}
                  link="/user"
                  size="small"
                  style={{ width: '100%' }}
                  color="primary"
                  startIcon={<PersonIcon />}
                >
                  Profile
                </BtnRrdLink>
              </li>
              <li>
                <IconButton
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                  size="small"
                  style={{ width: '100%' }}
                  color="primary"
                  startIcon={<ExitToAppIcon />}
                >
                  Logout
                </IconButton>
              </li>
            </>
          ) : (
            <>
              <li>
                <BtnRrdLink
                  functionOnClick={() => setIsOpen(false)}
                  link="/login"
                  size="small"
                  style={{ width: '100%' }}
                  color="primary"
                >
                  Login
                </BtnRrdLink>
              </li>
              <li>
                <BtnRrdLink
                  functionOnClick={() => setIsOpen(false)}
                  link="/register"
                  size="small"
                  style={{ width: '100%' }}
                  color="primary"
                >
                  Register
                </BtnRrdLink>
              </li>
            </>
          )}
        </ul>
      </CSSTransition>
      {/* {isOpen && (
        
      )} */}
    </StyledMenu>
  );
}
