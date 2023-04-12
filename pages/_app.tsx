import { SessionContext } from '@/context/SessionContext';
import { SessionWithUserSafe } from '@/types/session';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { green } from '@mui/material/colors';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

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

const getSessionFromLocalStorage = () => {
  if (typeof window === 'undefined') return null;
  const session = localStorage.getItem('session');
  if (session) {
    return JSON.parse(session);
  }
  return null;
};

export default function App({ Component, pageProps }: AppProps) {
  const [session, setSession] = useState<SessionWithUserSafe | undefined>(
    getSessionFromLocalStorage
  );

  useEffect(() => {
    localStorage.setItem('session', JSON.stringify(session));
  }, [session]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SessionContext.Provider value={{ session, setSession }}>
        <Component {...pageProps} />
      </SessionContext.Provider>
    </ThemeProvider>
  );
}
