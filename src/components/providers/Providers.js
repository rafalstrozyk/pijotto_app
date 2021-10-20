// import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
// import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { AuthProvider } from '../../contexts/AuthContext';
import { FirestoreProvider } from '../../contexts/FirestoreContext';
import { AppStateProvider } from '../../contexts/AppStateContext';
import ThemeContainer from './ThemeContainer';

// import { theme } from '../../style/theme';

// import { responsiveFontSizes } from '@material-ui/core/styles';

function Providers({ children }) {
  // const responsiveTheme = responsiveFontSizes(theme);
  return (
    <AppStateProvider>
      <AuthProvider>
        <FirestoreProvider>
          <ThemeContainer>{children}</ThemeContainer>
        </FirestoreProvider>
      </AuthProvider>
    </AppStateProvider>
  );
}

Providers.propTypes = {
  children: PropTypes.any,
};

export default Providers;
