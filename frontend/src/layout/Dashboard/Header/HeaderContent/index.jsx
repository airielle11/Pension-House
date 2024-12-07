// material-ui
import useMediaQuery from '@mui/material/useMediaQuery'; 
import Box from '@mui/material/Box';

// project import
import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection'; 

// ==============================|| HEADER - CONTENT ||============================== // 

export default function HeaderContent() {
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',   
        width: '100%',
      }}
    > 
      <Notification />   
      {/* Display layout for large screens */}
      {!downLG && <Profile />}

      {/* Display layout for smaller screens */}
      {downLG && <MobileSection />}
    </Box>
  );
}
