import {AppBar, ColorModeToggle, Toolbar, ThemeProvider, Box, Container, useColorScheme} from '@oxygen-ui/react';
import {ReactElement, useEffect} from 'react';
import XSSZone from './components/XSSZone';
import ActionCenter from './components/SDKConfigurationCenter.tsx';
import Typography from '@oxygen-ui/react/Typography';
import Button from '@oxygen-ui/react/Button';
import IconButton from '@oxygen-ui/react/IconButton';
import {useAuthContext} from '@asgardeo/auth-react';
import AsgardeoLogo from '/assets/images/asgardeo-logo.svg';
import AsgardeoLogoInverted from '/assets/images/asgardeo-logo-inverted.svg';
import Logo from '/assets/images/logo.webp';
import PowerIcon from './components/icons/PowerIcon';
import VulnerableZone from './components/VulnerableZone.tsx';

const App = (): ReactElement => {
  const {state, signIn, signOut} = useAuthContext();
  const {mode} = useColorScheme();

  return (
    <Box display="flex" flexDirection="column">
      <AppBar className="app-header" elevation={0} color="transparent" variant="outlined">
        <Toolbar className="app-header-toolbar">
          <Box display="flex" flexDirection="row" alignItems="center">
            <img height={40} src={Logo} />
            <Typography variant="h5">XSS Playground</Typography>
          </Box>
          <Box>
            <ColorModeToggle />
            {state.isAuthenticated && (
              <IconButton onClick={() => signOut()}>
                <PowerIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box display="flex" flexDirection="column" sx={{flexGrow: 1, pt: '72px'}} height="100vh">
        <Container>
          {state.isAuthenticated ? (
            <>
              <Box display="flex" flexDirection="column" gap={3} sx={{mt: 4}}>
                <Box display="flex" flexDirection="row" gap={3}>
                  <ActionCenter />
                  <Box display="flex" flexDirection="column" gap={3}>
                    <XSSZone />
                    <VulnerableZone />
                  </Box>
                </Box>
              </Box>
            </>
          ) : (
            <Box display="flex" flexDirection="row" className="Hero" gap={8}>
              <Box textAlign="left">
                <Typography variant="h3">👋 Hello! Welcome</Typography>
                <Typography variant="h1">
                  <em>React</em>
                  <br />
                  XSS Playground
                </Typography>
                <Typography className="Hero-description" variant="body2">
                  This is a simple playground to test out XSS vulnerabilities in a React application. This utilizes the
                  <img
                    src={mode === 'light' ? AsgardeoLogo : AsgardeoLogoInverted}
                    height={20}
                    className="AsgardeoLogo"
                  />{' '}
                  React SDK to demonstrate how to protect your application with the possible exploits.
                  <hr />
                  Please sign in to continue with the playground 🎡
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  className="Button-signIn"
                  onClick={() => signIn()}
                  sx={{mt: 3}}
                >
                  Click here to Sign In
                </Button>
              </Box>
              <Box>
                <img className="Hero-image" height={500} src={Logo} />
              </Box>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default App;
