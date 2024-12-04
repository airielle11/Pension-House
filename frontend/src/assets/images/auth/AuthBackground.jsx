// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import bg from './auth-bg.png';

// ==============================|| AUTH BLUR BACK SVG ||============================== //

export default function AuthBackground() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: 'absolute',
        filter: 'blur(3px)',
        zIndex: -1,
        bottom: 0,
        top: 0,  
        left: 0,
        right: 0,
       }}
    >
       <img src={bg} alt="PeniStock Logo" style={{height: '100%', width: '100%', objectFit: 'center'}}/>
    </Box>
  );
}
