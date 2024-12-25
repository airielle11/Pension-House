import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

// Material-UI imports
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

// Formik and Yup imports
import * as Yup from 'yup';
import { Formik } from 'formik';

// Project imports
import AnimateButton from '../../../components/@extended/AnimateButton.jsx';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';

export default function AuthResetPassword({ isDemo = false }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  // Extract token from URL query params
  const getTokenFromQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('token'); // Extract the 'token' parameter
  };

  const token = getTokenFromQuery();

  return (
    <Formik
      initialValues={{
        new_password: '',
        confirmed_password: '',
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        new_password: Yup.string().max(255).required('Password is required'),
        confirmed_password: Yup.string()
          .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
          .required('Confirm password is required'),
      })}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          // Send reset password request
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/reset_password/`,
            {
              token, // Include token
              new_password: values.new_password,
              confirmed_password: values.confirmed_password,
            }
          );

          // Redirect to login page on success
          navigate('/login');
        } catch (error) {
          if (error.response) {
            setErrors({ submit: error.response.data.error || 'Password reset failed' });
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
                <InputLabel htmlFor="new-password-login">New Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.new_password && errors.new_password)}
                  id="new-password-login"
                  type={showPassword ? 'text' : 'password'}
                  value={values.new_password}
                  name="new_password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Enter new password"
                />
              </Stack>
              {touched.new_password && errors.new_password && (
                <FormHelperText error>{errors.new_password}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="confirm-password-login">Confirm Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.confirmed_password && errors.confirmed_password)}
                  id="confirm-password-login"
                  type={showPassword ? 'text' : 'password'}
                  value={values.confirmed_password}
                  name="confirmed_password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Confirm new password"
                />
              </Stack>
              {touched.confirmed_password && errors.confirmed_password && (
                <FormHelperText error>{errors.confirmed_password}</FormHelperText>
              )}
            </Grid>
            {errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}
            <Grid item xs={12}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{ backgroundImage: 'linear-gradient(#14ADD6, #384295)' }}
                >
                  Submit
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}

AuthResetPassword.propTypes = { isDemo: PropTypes.bool };
