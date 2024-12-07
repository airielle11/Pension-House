import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button'; 
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

// Uses Formik and Yup third party for input validation, which simplifies handling form state and errors.
// Yup is a JS library to build object schemas and define how the data should look like and what kinds of values are expected of them
import * as Yup from 'yup';
// Formik is a small group of React components and hooks for building forms in React
import { Formik } from 'formik';

// project import
import AnimateButton from '../../../components/@extended/AnimateButton.jsx';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';

// ============================|| JWT - LOGIN ||============================ //

export default function AuthLogin({ isDemo = false }) {
  // Initialize navigation hook
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{ 
          password: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string().max(255).required('Password is required'),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/reset_password/`, {
              password: values.password,
            }); 
        
            // // Handle success, l ike storing the token or redirecting
            // console.log('Login successful:', response.data);
            // // For example, you could store the token in localStorage
            // localStorage.setItem('token', response.data.token);
            // Redirect page to the dashboard page
            navigate('/dashboard/default'); 
          } catch (error) {
            // Handle error (incorrect credentials or server error)
            if (error.response) {
              setErrors({ submit: error.response.data.error || 'Login failed' });
            } else {
              setErrors({ submit: 'An error occurred. Please try again later.' });
            }
          }
          setSubmitting(false);
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
               
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">New Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )}
              </Grid>
 
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" sx={{backgroundImage: 'linear-gradient(#14ADD6, #384295)'}} >
                    Submit
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}

AuthLogin.propTypes = { isDemo: PropTypes.bool };


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function ResetPassword() {
//   const [email, setEmail] = useState('');
//   const [token, setToken] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Parse the URL hash to extract email and access_token
//     const urlParams = new URLSearchParams(window.location.hash.slice(1)); // Remove the `#` at the start
//     const accessToken = urlParams.get('otp');
//     const emailFromToken = urlParams.get('email'); // Adjust based on how Supabase provides the email

//     if (accessToken) {
//       setToken(accessToken);
//     }

//     if (emailFromToken) {
//       setEmail(emailFromToken);
//     }
//   }, []);

//   const handleResetPassword = async (e) => {
//     e.preventDefault();

//     if (!password) {
//       setError('Password is required');
//       return;
//     }

//     try {
//       const response = await axios.post(`${import.meta.env.VITE_API_URL}/reset_password/`, {
//         email,
//         otp: token,
//         new_password: password,
//       });

//       if (response.status === 200) {
//         setSuccess('Password reset successful!');
//         setTimeout(() => {
//           navigate('/login'); // Redirect to login page
//         }, 3000);
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || 'An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h2>Reset Password</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {success && <p style={{ color: 'green' }}>{success}</p>}
//       <form onSubmit={handleResetPassword}>
//         <div>
//           <label htmlFor="password">New Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit">Reset Password</button>
//       </form>
//     </div>
//   );
// }

