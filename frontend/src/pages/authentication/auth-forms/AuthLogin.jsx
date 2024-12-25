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
          email: '',
          password: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required'),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/login/`, {
              email: values.email,
              password: values.password,
            });
        
            const { token, role } = response.data;
        
            // Store the token in localStorage
            localStorage.setItem('token', token);
        
            // Role-based redirection
            if (role === 'admin') {
              navigate('/admin/dashboard'); // Admin Dashboard
            } else if (role === 'Manager') {
              navigate('/manager/dashboard'); // Manager Dashboard
            } else {
              navigate('/dashboard/default'); // Default User Dashboard
            }
          } catch (error) {
            if (error.response) {
              setErrors({ submit: error.response.data.error || 'Login failed' });
            } else {
              setErrors({ submit: 'An unexpected error occurred. Please try again.' });
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
                  <InputLabel htmlFor="email-login">Email Address</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email} 
                    name="email" 
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email address" 
                    fullWidth
                    error={Boolean(touched.email && errors.email)} 
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                  </FormHelperText> 
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
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

              <Grid item xs={12} sx={{ mt: -1, display: 'flex', justifyContent: 'flex-end'}}>
                <Link variant="h6" component={RouterLink} to="/forgot_password" color="text.primary">
                  Forgot Password?
                </Link>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" sx={{backgroundImage: 'linear-gradient(#14ADD6, #384295)'}} >
                    Sign In
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
