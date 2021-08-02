import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../style/theme';
import { AuthProvider } from '../../contexts/AuthContext';
import { FirestoreProvider } from '../../contexts/FirestoreContext';

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <FirestoreProvider>
        <ThemeProvider theme={theme}>
          <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
        </ThemeProvider>
      </FirestoreProvider>
    </AuthProvider>
  );
}
