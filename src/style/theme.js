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
      secondary: '#407CB8',
    },
  },
});
