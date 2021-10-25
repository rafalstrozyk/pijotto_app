import { useContext } from 'react';
import PropTypes from 'prop-types';
import { useWindowSize } from '../../hooks/useWindowSize';

import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { AppSatateContext } from '../../contexts/AppStateContext';

import { darkTheme, theme } from '../../style/theme';

import { responsiveFontSizes } from '@material-ui/core/styles';

function ThemeContainer({ children }) {
  const [state] = useContext(AppSatateContext);
  const size = useWindowSize();

  const responsiveTheme = responsiveFontSizes(
    state.darkMode ? darkTheme : theme
  );
  return (
    <ThemeProvider size={size} theme={state.darkMode ? darkTheme : theme}>
      <MuiThemeProvider theme={responsiveTheme}>{children}</MuiThemeProvider>
    </ThemeProvider>
  );
}

ThemeContainer.propTypes = {
  children: PropTypes.any,
};

export default ThemeContainer;
