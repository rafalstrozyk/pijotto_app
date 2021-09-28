import styled from "styled-components";

import ComponentsWrapperScrollContext from "./components/ComponentsWrapperScrollContext";
import Router from "./components/Router/Router";
import Providers from "./components/providers/Providers";
import Navbar from "./components/Navigation/Navbar";
import Allert from "./components/Allert";

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
      </Router>
      <ComponentsWrapperScrollContext />
    </Providers>
  );
}

export default App;
