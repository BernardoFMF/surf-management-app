import React, {useEffect} from 'react'
import { Box, Grid, Typography, Stack, Alert, Button, useMediaQuery } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next'
import { Formik, Form } from 'formik';
import { parse, isDate } from "date-fns";
import InputField from '../multiStepForm/InputField';
import Base64InputField from '../multiStepForm/Base64InputField';
import DropdownInputField from '../multiStepForm/DropdownInputField';
import DateInputField from '../multiStepForm/DateInputField';
import { updateUser } from '../../store/actions/userActions';
import { useState } from 'react';
import { getMemberById } from '../../store/actions/memberActions'

import { useTheme } from '@mui/material/styles';

import countries from '../../assets/data/countries.json'

import AnimateButton from '../extended/AnimateButton';

import { useDispatch, useSelector } from 'react-redux';

const PersonalDetailsTab = () => {
    const theme = useTheme()
    const dispatch = useDispatch()

    
    
    const { t } = useTranslation()
    const [alertSuccess, setAlertSuccess] = useState(false)

    const memberFetch = useSelector((state) => state.memberFetch)
    const { memberGet } = memberFetch

    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))

    const parseDate = (originalValue) => {
        let parsedDate = isDate(originalValue)
            ? originalValue
            : parse(originalValue, "yyyy-MM-dd", new Date())

        return parsedDate
    }


    const userUpdate = useSelector((state) => state.userUpdate)
    const { loading, error, updated } = userUpdate

    const handleSubmit = async (values) => {
        const updatedUser = { ...values, member_id: memberGet.member_id_, type: memberGet.member_type_, phone_number: memberGet.phone_number_, postal_code: memberGet.postal_code_, address: memberGet.address_, location: memberGet.location_, paid_enrollment: memberGet.paid_enrollment_, is_admin: memberGet.is_admin_, is_deleted: memberGet.is_deleted_ }
        dispatch(updateUser(updatedUser))
        setAlertSuccess(true)
    
    }

    return (
        <>
            { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> }
            { updated && alertSuccess && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="success" onClose={() => {setAlertSuccess(false);}}>{t('updated_sucessfully')}</Alert></Box> }
            <Formik
            enableReinitialize={true}
            initialValues={{
                username: memberGet.username_,
                email: memberGet.email_,
                iban: memberGet.iban_,
                cc: memberGet.cc_,
                nif: memberGet.nif_,
                type: memberGet.member_type_,
                birth_date: memberGet.birth_date_,
                nationality: memberGet.nationality_ || 'Portuguese',
                full_name: memberGet.full_name_,
                img: memberGet.img_value_,
                gender: memberGet.gender_ || 'Other'
            }}
            validationSchema={Yup.object().shape({
                username: Yup.string().required(t('sign_up_username_mandatory')),
                email: Yup.string().email(t('sign_up_email_valid')).max(255).required(t('sign_up_email_mandatory')),
                full_name: Yup.string().required(t('sign_up_full_name_mandatory')),
                cc: Yup.string().matches(/^[0-9]+$/, t('sign_up_only_digits')).min(9, t('sign_up_exact_nine')).max(9,  t('sign_up_exact_nine')).required( t('sign_up_cc_mandatory')),
                nif: Yup.string().required(t('sign_up_nif_mandatory')).matches(/^[0-9]+$/, t('sign_up_only_digits')).min(9,  t('sign_up_exact_nine')).max(9,  t('sign_up_exact_nine')),
                iban: Yup.string().test('len', t('sign_up_iban_mandatory'), val => val.length === 25),
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
                                    <Typography variant="subtitle2">{memberGet.member_type_}</Typography>
                                    <Typography variant="subtitle2">{t("associate_number") + ": " + memberGet.member_id_}</Typography>
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ pt: 2, pl: 2, pr: 2, width: { md: 300 }}}>
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
                                <InputField name='iban' label='IBAN' type='text' ></InputField>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box sx={{ pt: 2, pl: 2, pr: 2, width: { md: 300 }}}>
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
                                        <LoadingButton
                                            disableElevation
                                            fullWidth
                                            size="normal"
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            loading = {loading}
                                        >
                                            {t('sign_up_submit')}
                                        </LoadingButton>
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