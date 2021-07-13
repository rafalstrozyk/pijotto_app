import Router from './components/Router/Router';
import Providers from './style/Providers';
import { GlobalStyle } from './style/globalStyle';
import Navbar from './components/Navigation/Navbar';

function App() {
  return (
    <Providers>
      <Router>
        <Navbar />
      </Router>
      <GlobalStyle />
    </Providers>
  );
}

export default App;
