import { useContext } from 'react';

import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { AppSatateContext } from '../../contexts/AppStateContext';

import { darkTheme, theme } from '../../style/theme';

import { responsiveFontSizes } from '@material-ui/core/styles';

function ThemeContainer({ children }) {
  const [state] = useContext(AppSatateContext);

  const responsiveTheme = responsiveFontSizes(
    state.darkMode ? darkTheme : theme
  );
  return (
    <ThemeProvider theme={state.darkMode ? darkTheme : theme}>
      <MuiThemeProvider theme={responsiveTheme}>{children}</MuiThemeProvider>
    </ThemeProvider>
  );
}

export default ThemeContainer;
