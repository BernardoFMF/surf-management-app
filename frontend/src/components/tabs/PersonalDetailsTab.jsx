import React, { useEffect, useState } from 'react'
import { Box, Container, Grid, Typography, Stack, Alert, Avatar, TextField, Button, useMediaQuery } from '@mui/material'
import default_image from './../../assets/data/blank-profile-picture.png'
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next'
import { Formik, Form } from 'formik';
import { parse, isDate } from "date-fns";
import useScriptRef from '../../hooks/useScriptRef'
import InputField from '../multiStepForm/InputField';
import Base64InputField from '../multiStepForm/Base64InputField';
import DropdownInputField from '../multiStepForm/DropdownInputField';
import DateInputField from '../multiStepForm/DateInputField';
import { updateUser } from '../../store/actions/userActions';

import { useTheme } from '@mui/material/styles';

import countries from '../../assets/data/countries.json'

import AnimateButton from '../extended/AnimateButton';

import { useDispatch, useSelector } from 'react-redux';

import CircularProgress from '@mui/material/CircularProgress';

const PersonalDetailsTab = ({ user }) => {
    const theme = useTheme()

    const {t, i18n} = useTranslation()

    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))

    const parseDate = (originalValue) => {
        let parsedDate = isDate(originalValue)
            ? originalValue
            : parse(originalValue, "yyyy-MM-dd", new Date())

        return parsedDate
    }

    const dispatch = useDispatch()

    const userUpdate = useSelector((state) => state.userUpdate)
    const { error, updated } = userUpdate
    const handleSubmit = async (values) => {
        const updatedUser = { ...values, member_id: user.member_id_, type: user.member_type_, phone_number: user.phone_number_, postal_code: user.postal_code_, address: user.address_, location: user.location_, paid_enrollment: user.paid_enrollment_, is_admin: user.is_admin_, is_deleted: user.is_deleted_ }
        dispatch(updateUser(updatedUser))
    }

    return (
        <>
            { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> }
            { updated && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="success">{t('updated_sucessfully')}</Alert></Box> }
            <Formik
            initialValues={{
                username: user.username_,
                email: user.email_,
                cc: user.cc_,
                nif: user.nif_,
                type: user.member_type_,
                birth_date: user.birth_date_,
                nationality: user.nationality_ || 'Portuguese',
                full_name: user.full_name_,
                img: user.img_value_,
                gender: user.gender_ || 'Other'
            }}
            validationSchema={Yup.object().shape({
                username: Yup.string().required(t('sign_up_username_mandatory')),
                email: Yup.string().email(t('sign_up_email_valid')).max(255).required(t('sign_up_email_mandatory')),
                full_name: Yup.string().required(t('sign_up_full_name_mandatory')),
                cc: Yup.string().matches(/^[0-9]+$/, t('sign_up_only_digits')).min(9, t('sign_up_exact_nine')).max(9,  t('sign_up_exact_nine')).required( t('sign_up_cc_mandatory')),
                nif: Yup.string().required(t('sign_up_nif_mandatory')).matches(/^[0-9]+$/, t('sign_up_only_digits')).min(9,  t('sign_up_exact_nine')).max(9,  t('sign_up_exact_nine')),
                gender: Yup.string().required(t('sign_up_gender_mandatory')),
                nationality: Yup.string().required(t('sign_up_nationality_mandatory')),
                birth_date: Yup.date().transform(parseDate).typeError(t('sign_up_valid_date')).max(new Date(), t('sign_up_max_date')).required(t('sign_up_birth_date_mandatory')),
                img: Yup.mixed()
            })}
            onSubmit={handleSubmit}
            >
            {formik => (
                <Form>
                    <Grid container direction="row" sx={{ ml: { md: 4, lg: 4 } }} justifyContent='center' spacing={1}>
                        <Grid item>
                            <Box mt={2} sx={{ pt: 2, pr: 2}}>
                                <Stack direction="column" alignItems="center">
                                    <Base64InputField size={100} name='img' label={t('sign_up_image')}></Base64InputField>
                                    <Typography variant="subtitle2">{user.member_type_}</Typography>
                                </Stack>
                                
                            </Box>
                            
                        </Grid>
                        <Grid item>
                            <Box sx={{ pt: 2, pl: 2, pr: 2, width: { md: 400 }}}>
                                <InputField name='username' label={t('sign_up_username')} type='text' InputProps={{readOnly: true}}></InputField>
                                <InputField name='email' label={t('sign_up_email')} type='text' InputProps={{readOnly: true}}></InputField>
                                <Grid container spacing={matchDownSM ? 0 : 2}>
                                    <Grid item xs={12} sm={6}>
                                        <DropdownInputField name='gender' label={t('sign_up_gender')} options={{ M: t('male'), F: t('female'), O: t('other') }}></DropdownInputField>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <DropdownInputField name='nationality' label={t('sign_up_nationality')} options={countries}></DropdownInputField>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ pt: 2, pl: 2, pr: 2, width: { md: 400 }}}>
                                <InputField name='full_name' label={t('sign_up_full_name')} type='text'></InputField>
                                <Grid container spacing={matchDownSM ? 0 : 2}>
                                    <Grid item xs={12} sm={6}>
                                        <InputField name='cc' label={t('sign_up_cc')} type='text'></InputField>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <InputField name='nif' label={t('sign_up_nif')} type='text'></InputField>
                                    </Grid>
                                </Grid>
                                
                                
                                <DateInputField name='birth_date' label={t('sign_up_birth_date')}></DateInputField>
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

export default PersonalDetailsTab