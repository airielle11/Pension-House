import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios';
import { useState } from 'react'; 

import Button from '@mui/material/Button'; 
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import * as Yup from 'yup'; 
import { Formik } from 'formik';

import AnimateButton from '../../../components/@extended/AnimateButton.jsx'; 
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function AuthLogin() {
  const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");

    return (
        <>
            <Formik
                initialValues={{
                    email: '', 
                    submit: null,
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                })}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    try {
                        const response = await axios.post(`${import.meta.env.VITE_API_URL}/request_reset_password/`, {
                            email: values.email, 
                        });

                        Swal.fire({
                            title: 'Email Sent',
                            html: 'Password reset email sent successfully. <br>Check your inbox and click the link.',
                            icon: 'success'
                        
                        }) 
                        navigate('/reset_password'); 
                    } catch (error) {
                        if (error.response) {
                            setErrors({ submit: error.response.data.error || 'Error sending reset email' });
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
                                    <FormHelperText error>
                                        {errors.email}
                                    </FormHelperText> 
                                )}
                            </Grid>
                            {/* {successMessage && (
                                <Grid item xs={12}>
                                    <FormHelperText success>
                                        {successMessage}
                                    </FormHelperText>
                                </Grid>
                            )}
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>
                                        {errors.submit}
                                    </FormHelperText>
                                </Grid>
                            )} */}
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
                                        Send
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
