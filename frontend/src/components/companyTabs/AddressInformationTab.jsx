import React from 'react'
import { Box, Grid, Alert, Button, useMediaQuery } from '@mui/material'
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next'
import { Formik, Form } from 'formik';
import InputField from '../multiStepForm/InputField';
import { updateCompany } from '../../store/actions/companyActions';
import { useTheme } from '@mui/material/styles';
import AnimateButton from '../extended/AnimateButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch, useSelector } from 'react-redux';

const AddressInformationTab = () => {
    const theme = useTheme()

    const { t } = useTranslation()

    const memberFetch = useSelector((state) => state.memberFetch)
    const { memberGet } = memberFetch

    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))

    const dispatch = useDispatch()

    const companyUpdate = useSelector((state) => state.companyUpdate)
    const { loading, error, updated } = companyUpdate

    const handleSubmit = async (values) => {
        const updatedCompany = { ...values, cid: memberGet.member_id_, name: memberGet.name_, nif: memberGet.nif_, is_deleted: memberGet.is_deleted_, img: memberGet.img_value_, iban: memberGet.iban_ }
        dispatch(updateCompany(updatedCompany))
    }

    return (
        <>
           { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> }
            { updated && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="success">{t('updated_sucessfully')}</Alert></Box> }
            <Formik
                initialValues={{
                    location: memberGet.location_, 
                    address: memberGet.address_, 
                    phone_number: memberGet.phone_number_, 
                    postal_code: memberGet.postal_code_
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

export default AddressInformationTab