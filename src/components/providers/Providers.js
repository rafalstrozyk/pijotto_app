import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../style/theme';
import { AuthProvider } from '../../contexts/AuthContext';

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
