import styled from 'styled-components';

import ContainerStateForGlobalStyle from './components/ContainerStateForGlobalStyle';
import Router from './components/Router/Router';
import Providers from './components/providers/Providers';
import Navbar from './components/Navigation/Navbar';
import Allert from './components/Allert';
import Footer from './components/Footer';
import Background from './components/Background';

const StyledNavbar = styled(Navbar)`
  position: fixed;
  width: 100%;
  z-index: 1000;
  top: 0;
`;

function App() {
  return (
    <Providers>
      <Router>
        <StyledNavbar />
        <Allert />
        <Footer />
      </Router>
      <ContainerStateForGlobalStyle />
      <Background />
    </Providers>
  );
}

export default App;
