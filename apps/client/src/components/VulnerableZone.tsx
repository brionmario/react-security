import {FC, PropsWithChildren, useEffect, useState} from 'react';
import Card from '@oxygen-ui/react/Card';
import Typography from '@oxygen-ui/react/Typography';
import Box from '@oxygen-ui/react/Box';
import {useSearchParams} from 'react-router-dom';
import './vulnerable-zone.css';
import {Code} from '@oxygen-ui/react';

export type VulnerableZoneProps = PropsWithChildren;

const VulnerableZone: FC<VulnerableZoneProps> = () => {
  let [searchParams] = useSearchParams();

  const [callbackFromURL, setCallbackFromURL] = useState<string>('');
  const [callbackTextFromURL, setCallbackTextFromURL] = useState<string>('Vulnerable Link');

  useEffect(() => {
    const _callback: string | null = searchParams.get('callback');
    const _callbackText: string | null = searchParams.get('callbackText');

    if (_callback) {
      setCallbackFromURL(_callback);
    }

    if (_callbackText) {
      setCallbackTextFromURL(_callbackText);
    }
  }, [searchParams]);

  return (
    <Card className="VulnerableZoneCard">
      <Box>
        <Box>
          <Typography gutterBottom variant="h5" component="div">
            Attack Zone
          </Typography>
          <Typography color="text.secondary" variant="body2">
            This is the place where attacks happen.
          </Typography>
        </Box>
        <Box>
          <Box display="flex" flexDirection="column" sx={{mt: 2}}>
            <Typography variant="body" sx={{fontWeight: '500'}} color="text.secondary">
              URL XSS Attack
            </Typography>
            <Typography color="text.secondary" variant="body2" sx={{mt: 1}}>
              Reads a <Code>callback</Code> URL and a <Code>callbackText</Code> from the URL and renders a link with the{' '}
              <Code sx={{color: 'var(--oxygen-palette-error-main)'}}>dangerouslySetInnerHTML</Code> attribute.
            </Typography>
            <Card id="xss-vulnerable-zone" sx={{borderRadius: 0, mt: 1}}>
              <a href={callbackFromURL} dangerouslySetInnerHTML={{__html: callbackTextFromURL}}></a>
            </Card>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default VulnerableZone;
