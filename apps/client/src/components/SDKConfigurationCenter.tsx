import {FC, PropsWithChildren, useEffect, useState} from 'react';
import Card from '@oxygen-ui/react/Card';
import Typography from '@oxygen-ui/react/Typography';
import {AuthReactConfig, Storage, useAuthContext} from '@asgardeo/auth-react';
import {codeToHtml} from 'shiki';
import Box from '@oxygen-ui/react/Box';
import {FormHelperText, InputLabel, ToggleButton, ToggleButtonGroup} from '@oxygen-ui/react';
import Button from '@oxygen-ui/react/Button';
import './sdk-configuration-center.css';

export type SDKConfigurationCenterProps = PropsWithChildren;

const SDKConfigurationCenter: FC<SDKConfigurationCenterProps> = ({children}) => {
  const {updateConfig, signOut, signIn} = useAuthContext();

  const [sdkConfig, setSDKConfig] = useState<string>('');
  const [sdkStorage, setSDKStorage] = useState<Storage>(Storage.SessionStorage);

  useEffect(() => {
    (async () => {
      const config: AuthReactConfig | null = getSDKConfigFromStorage();

      if (!config) {
        return;
      }

      setParsedSDKConfig(config);
    })();
  }, []);

  const getSDKConfigFromStorage = (): AuthReactConfig | null => {
    let config: AuthReactConfig | null = null;

    Object.entries(sessionStorage).forEach(([key, value]) => {
      if (key.startsWith('config_data-instance')) {
        try {
          config = JSON.parse(value);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      }
    });

    return config;
  };

  const setParsedSDKConfig = async (config: AuthReactConfig) => {
    setSDKConfig(
      await codeToHtml(JSON.stringify(config, null, 2), {
        lang: 'json',
        theme: 'github-dark',
      }),
    );
  };

  const handleUpdateSDKConfig = async () => {
    updateConfig({
      storage: sdkStorage,
    });

    const config: AuthReactConfig | null = getSDKConfigFromStorage();

    setParsedSDKConfig({
      ...config,
      storage: sdkStorage,
      resourceServerURLs: [...(config?.resourceServerURLs || []), 'http://localhost:3002'],
    } as AuthReactConfig);

    sessionStorage.setItem('xss_playground-sdk-storage', sdkStorage);

    await signOut();

    await signIn();
  };

  return (
    <Card className="SDKConfigurationCenterCard">
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography gutterBottom variant="h5" component="div">
          SDK Configurations
        </Typography>
        <Box>
          <Box>
            <Typography gutterBottom variant="h6" component="div">
              Active Configuration
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Following is the active configuration that is being used by the SDK.
            </Typography>
          </Box>
          <Card className="CodeBlock" sx={{mt: 2}} dangerouslySetInnerHTML={{__html: sdkConfig}} />
        </Box>
        <Box>
          <Box>
            <Typography gutterBottom variant="h6" component="div">
              On Demand Configuration
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Use the following handles to update the configuration on demand.
            </Typography>
          </Box>
          <Box sx={{mt: 2}}>
            <InputLabel htmlFor="storage">
              <Typography fontWeight="600">Storage</Typography>
            </InputLabel>
            <Box sx={{mt: 1}}>
              <ToggleButtonGroup
                id="storage"
                value={sdkStorage}
                size="small"
                exclusive
                onChange={(_, value: Storage) => setSDKStorage(value)}
                aria-label="text alignment"
              >
                <ToggleButton value="sessionStorage" aria-label="left aligned">
                  Session Storage
                </ToggleButton>
                <ToggleButton value="localStorage" aria-label="centered">
                  Local Storage
                </ToggleButton>
                <ToggleButton value="webWorker" aria-label="right aligned">
                  Web Worker Storage
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <FormHelperText id="storage">
              The storage medium where the session information such as the access token should be stored.
            </FormHelperText>
          </Box>
          <Button variant="contained" size="small" color="primary" sx={{mt: 2}} onClick={handleUpdateSDKConfig}>
            Update & Sign In Again
          </Button>
        </Box>
        {children}
      </Box>
    </Card>
  );
};

export default SDKConfigurationCenter;
