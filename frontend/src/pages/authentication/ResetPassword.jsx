// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import AuthWrapper from './AuthWrapper';
import AuthResetPassword from './auth-forms/AuthResetPassword';
import logo from '../../assets/images/penistock_logo.png';


// ================================|| LOGIN ||================================ //

export default function Login() {
  return (
    <AuthWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12}> 
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={-1}>
            <img
              src={logo}
              alt="PeniStock Logo"
              style={{
                width: '120px',   
              }}
            />
            <Typography variant="h3" color={'#5584CE'}>PENISTOCK</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthResetPassword />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
