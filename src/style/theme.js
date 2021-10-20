import { createTheme } from '@material-ui/core/styles';

const typography = {
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
};

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
  typography,
  myStyle: {
    shadows: 'rgba(55, 150, 131, 0.75)',
  },
});

export const darkTheme = createTheme({
  palette: {
    primary: {
      light: '#423F3E',
      main: '#362222',
      dark: '#2B2B2B',
      contrastText: '#fcfdfa',
    },
    secondary: {
      light: '#423F3E',
      main: '#64882d',
      dark: '#423F3E',
      contrastText: '#edf5e1',
    },
    text: {
      primary: '#edf5e1',
      secondary: '#423F3E',
    },
  },
  typography,
  myStyle: {
    shadows: 'rgba(66,63,62,0.75)',
  },
});
