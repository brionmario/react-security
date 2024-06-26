import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {AuthProvider, AuthReactConfig} from '@asgardeo/auth-react';
import theme from './theme';
import {ThemeProvider} from '@oxygen-ui/react';
import {BrowserRouter} from 'react-router-dom';
import './index.css';

const Root = () => {
  const [sdkStorage, setSDKStorage] = useState<string>('sessionStorage');

  useEffect(() => {
    let config: AuthReactConfig = {};

    Object.entries(sessionStorage).forEach(([key, value]) => {
      if (key.startsWith('config_data-instance')) {
        try {
          config = JSON.parse(value);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      }
    });

    setSDKStorage(config.storage || 'sessionStorage');
  }, []);

  return (
    <React.StrictMode>
      <AuthProvider
        config={{
          baseUrl: import.meta.env.VITE_ASGARDEO_SERVICES_URL,
          clientID: import.meta.env.VITE_ASGARDEO_CLIENT_ID,
          scope: ['openid', 'profile'],
          signInRedirectURL: import.meta.env.VITE_ASGARDEO_SIGN_IN_REDIRECT_URL,
          signOutRedirectURL: import.meta.env.VITE_ASGARDEO_SIGN_OUT_REDIRECT_URL,
          storage: sessionStorage.getItem('xss_playground-sdk-storage') || 'sessionStorage',
        }}
      >
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
