import SignIn from './views/SignIn';
import Loading from './views/Loading';
import Dashboard from './views/Dashboard';
import { useEffect, useMemo, useState } from 'react';
import { CssBaseline } from '@mui/material';
import { getDesignTokens, getThemePref } from './theme/theme';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UserContext, ColorModeContext } from "./hooks/Context";
import { BrowserRouter as Router } from 'react-router-dom';


export default function App() {

  const [user, loading] = useState(null);
  const [mode, setMode] = useState(getThemePref() ? getThemePref() : "dark");

  useEffect(() => {
      if (user && user.uid === "iLzcI4NkQkWILsSnTNXELAirrg62") {
          user.displayName = "Test Account";
      }
  }, [user]);

  const colorMode = useMemo(
      () => ({
          toggleColorMode: () => {
              setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
              localStorage.setItem(
                  "theme",
                  getThemePref() === "light" ? "dark" : "light"
              );
          },
      }),
      []
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  if (loading) {
      return (
          <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <Loading />
              </ThemeProvider>
          </ColorModeContext.Provider>
      );
  }
  if (user) {
      return (
          <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <Router>
                      <UserContext.Provider value={{ user }}>
                          <Dashboard />
                      </UserContext.Provider>
                  </Router>
              </ThemeProvider>
          </ColorModeContext.Provider>
      );
  }
  return (
      <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
              <CssBaseline />
              <SignIn />
          </ThemeProvider>
      </ColorModeContext.Provider>
  );
}
