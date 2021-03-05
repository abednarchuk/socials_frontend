import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles'
import { indigo, brown, red } from '@material-ui/core/colors'

export const darkTheme = unstable_createMuiStrictModeTheme({
  palette: {
    type: 'dark',
    primary: {
      main: indigo[400],
    },
    secondary: {
      main: '#A67150',
    },
    error: {
      main: red[400],
    },
    background: {
      default: '#121212',
    },
  },
})

export const lightTheme = unstable_createMuiStrictModeTheme({
  palette: {
    type: 'light',
    primary: {
      light: indigo[300],
      main: indigo[400],
      dark: indigo[500],
    },
    secondary: {
      main: brown[400],
    },
    error: {
      main: red[400],
    },
    background: {
      default: '#fffff4',
    },
  },
})
