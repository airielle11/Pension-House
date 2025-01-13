import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RoleContext } from '../../../contexts/RoleContext.jsx';
import * as Yup from 'yup';
import { Formik } from 'formik';

// Material-UI
import {
  Button,
  FormHelperText,
  Grid,
  Link,
  InputAdornment,
  IconButton,
  InputLabel,
  OutlinedInput,
  Stack,
} from '@mui/material';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import AnimateButton from '../../../components/@extended/AnimateButton.jsx';

export default function AuthLogin({ isDemo = false }) {
  const navigate = useNavigate();
  const { setRole } = useContext(RoleContext); // Correct use of context
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

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

            const { token, user_details } = response.data;

            if (!token || !user_details?.length) {
              throw new Error('Invalid response from server');
            }

            const role = user_details[0]?.position_management?.split(', ')[0] || 'Unknown';
            setRole(role);
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);

            const roleRoutes = {
              'Property Custodian': '/property_custodian/purchase_orders',
              'General Manager': '/top/purchase_orders',
              'Front Office Manager': '/desk/dashboard',
              'Executive Housekeeper': '/housekeeping/dashboard',
              'Chief Engineer': '/maintenance/dashboard',
              'Head Administrator': '/admin/dashboard',
            };

            navigate(roleRoutes[role] || '/dashboard/default');
          } catch (error) {
            const errorMsg = error.response?.data?.error || 'Login failed. Please try again.';
            setErrors({ submit: errorMsg });
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
                  <FormHelperText error>{errors.email}</FormHelperText>
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
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error>{errors.password}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sx={{ mt: -1, display: 'flex', justifyContent: 'flex-end' }}>
                <Link variant="h6" component={RouterLink} to="/forgot_password">
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
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{ backgroundImage: 'linear-gradient(#14ADD6, #384295)' }}
                  >
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
