import Router from './components/Router/Router';
import Providers from './style/Providers';
import { GlobalStyle } from './style/globalStyle';

function App() {
  return (
    <Providers>
      <Router />
      <GlobalStyle />
    </Providers>
  );
}

export default App;
