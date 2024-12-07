// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';

// project import
import AuthWrapper from './AuthWrapper';
import AuthForgotPassword from './auth-forms/AuthForgotPassword';
import logo from '../../assets/images/penistock_logo.png';


// ================================|| LOGIN ||================================ //

export default function Login() {

  const navigate = useNavigate();
  return (
    <AuthWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12}> 
          <Stack direction="column" spacing={-1}> 
            <Stack alignItems="flex-end">
            <Button
              sx={{
                background: '#fff',
                border: '2px solid',
                borderColor: 'linear-gradient(#14ADD6, #384295)',
                borderRadius: '10px',
                color: 'linear-gradient(#14ADD6, #384295)',
                width: '25px',
              }}
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            </Stack>
           
            <img
              src={logo}
              alt="PeniStock Logo"
              style={{
                width: '90px',   
              }}
            />
            <Typography variant="h5" color={'#5584CE'}>PENISTOCK</Typography>
            <Typography className='mt-3'>Password recovery.</Typography>
            <Typography className='mb-2' variant='h3'>Forgot your password?</Typography>
            <Typography className='mb-4'>
                Kindly enter the email address linked to this account and
                we will send you a code to enable you to change your 
                password.
            </Typography>

          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthForgotPassword />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
