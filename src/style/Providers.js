import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';

export default function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeProvider>
  );
}
