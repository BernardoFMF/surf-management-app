import React, { useEffect, useState } from 'react'
import { Box, Container, Grid, Typography, Stack, Alert, Avatar, TextField, Button, useMediaQuery } from '@mui/material'
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next'
import { Formik, Form } from 'formik';
import { parse, isDate } from "date-fns";
import useScriptRef from '../../hooks/useScriptRef'
import InputField from '../multiStepForm/InputField';
import { updateUser } from '../../store/actions/userActions';

import { useTheme } from '@mui/material/styles';

import AnimateButton from '../extended/AnimateButton';

import { useDispatch, useSelector } from 'react-redux';

import CircularProgress from '@mui/material/CircularProgress';

const AddressInformationTab = ({ user }) => {
    const theme = useTheme()

    const {t, i18n} = useTranslation()

    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))

    const scriptedRef = useScriptRef()

    const dispatch = useDispatch()

    const userUpdate = useSelector((state) => state.userUpdate)
    const { loading, error, updated } = userUpdate

    const handleSubmit = async (values) => {
        const updatedUser = { ...values, member_id: user.member_id_, username: user.username_, email: user.email_, gender: user.gender_, nationality: user.nationality_, full_name: user.full_name_, cc: user.cc_, nif: user.nif_, birth_date: user.birth_date_, type: user.member_type_, paid_enrollment: user.paid_enrollment_, is_admin: user.is_admin_, is_deleted: user.is_deleted_ }
        dispatch(updateUser(updatedUser))
    }

    return (
        <>
            { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> }
            { updated && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="success">{t('updated_sucessfully')}</Alert></Box> }
            <Formik
                initialValues={{
                    location: user.location_, 
                    address: user.address_, 
                    phone_number: user.phone_number_, 
                    postal_code: user.postal_code_
                }}
                validationSchema={Yup.object().shape({
                    location: Yup.string().required(t('sign_up_location_mandatory')),
                    address: Yup.string().required(t('sign_up_address_mandatory')),
                    postal_code: Yup.string().matches(/^\d{4}[-]\d{3}?$/, t('sign_up_postal_code_pattern')).required(t('sign_up_postal_code_mandatory')),
                    phone_number: Yup.string().matches(/^[0-9]+$/, t('sign_up_only_digits')).min(9, t('sign_up_exact_nine')).max(9, t('sign_up_exact_nine')).required(t('sign_up_phone_number_mandatory'))
                })}
                onSubmit={handleSubmit}
            >
                {formik => (
                    <Form>
                        <Grid container direction="row" sx={{ ml: { md: 0, lg: 4 } }} justifyContent='center' spacing={1}>
                            <Grid item>
                                <Box sx={{ pt: 2, pl: 2, pr: 2, width: { md: 400 }}}>
                                    <InputField name='location' label={t('sign_up_location')} type='text'></InputField>
                                    <InputField name='address' label={t('sign_up_address')} type='text'></InputField>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box sx={{ pt: 2, pl: 2, pr: 2, width: { md: 400 }}}>
                                    <InputField name='postal_code' label={t('sign_up_postal_code')} type='text'></InputField>
                                    <InputField name='phone_number' label={t('sign_up_phone_number')} type='text'></InputField>
                                    <Grid container spacing={matchDownSM ? 0 : 2}>
                                        <Grid item xs={12} sm={6} sx={{ mt: 2}}>
                                            <AnimateButton>
                                                <Button
                                                disableElevation
                                                disabled={formik.isSubmitting}
                                                fullWidth
                                                size="normal"
                                                variant="outlined"
                                                color="primary"
                                                onClick={() => window.location.reload()}
                                                >
                                                    {t('update_discard')}
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                        <Grid item xs={12} sm={6} sx={{ mt: 2}}>
                                            <AnimateButton>
                                                <Button
                                                disableElevation
                                                disabled={formik.isSubmitting}
                                                fullWidth
                                                size="normal"
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                >
                                                    {t('sign_up_submit')}
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                    </Grid>
                                </Box>
                                
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </>
            
  )
}

export default AddressInformationTab