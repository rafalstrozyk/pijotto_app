import { createTheme } from '@material-ui/core/styles';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#8ee4af',
      main: '#5cdb95',
      dark: '#379683',
      contrastText: '#05386b',
    },
    secondary: {
      light: '#379683',
      main: '#05386b',
      dark: '#379683',
      contrastText: '#edf5e1',
    },
    text: {
      primary: '#edf5e1',
      secondary: '#5cdb95',
    },
  },
  typography: {
    fontSize: 14,
    '@media only screen and (min-width: 1366px)': {
      fontSize: 17,
    },
    '@media only screen and (min-width: 768px)': {
      fontSize: 16,
    },
    '@media only screen and (min-width: 414px)': {
      fontSize: 15,
    },
  },
});
