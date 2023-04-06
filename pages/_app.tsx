import {
  createTheme,
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
} from '@mui/material';
import { green, lightGreen, purple } from '@mui/material/colors';
import type { AppProps } from 'next/app';
import "../public/styles.css";

const theme = createTheme({
  palette: {
    primary: {
      ...green,
      main: green[600],
    },
    background: {
      default: green['700'],
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
