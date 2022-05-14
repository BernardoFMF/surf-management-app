import React from 'react'
import { Box, Grid, Typography, Stack, Alert, Button, useMediaQuery } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next'
import { Formik, Form } from 'formik';
import InputField from '../multiStepForm/InputField';
import Base64InputField from '../multiStepForm/Base64InputField';

import { useTheme } from '@mui/material/styles';

import AnimateButton from '../extended/AnimateButton';

import { useDispatch, useSelector } from 'react-redux';

import { updateCompany } from '../../store/actions/companyActions';

const PersonalDetailsTab = () => {
    const theme = useTheme()

    const { t } = useTranslation()

    const memberFetch = useSelector((state) => state.memberFetch)
    const { memberGet } = memberFetch

    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))

    const dispatch = useDispatch()

    const companyUpdate = useSelector((state) => state.companyUpdate)
    const { loading, error, updated } = companyUpdate

    const handleSubmit = async (values) => {
        const updatedCompany = { ...values, cid: memberGet.member_id_, is_deleted: memberGet.is_deleted_, address: memberGet.address_, location: memberGet.location_, phone_number: memberGet.phone_number_, postal_code: memberGet.postal_code_ }
        dispatch(updateCompany(updatedCompany))
    }

    return (
        <>
            { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> }
            { updated && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="success">{t('updated_sucessfully')}</Alert></Box> }
            <Formik
                enableReinitialize={true}
                initialValues={{
                    name: memberGet.name_,
                    nif: memberGet.nif_,
                    img: memberGet.img_value_
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().required(t('sign_up_username_mandatory')),
                    nif: Yup.string().required(t('sign_up_nif_mandatory')).matches(/^[0-9]+$/, t('sign_up_only_digits')).min(9,  t('sign_up_exact_nine')).max(9,  t('sign_up_exact_nine')),
                    img: Yup.mixed()
                })}
                onSubmit={handleSubmit}
                >
                {formik => (
                    <Form>
                        <Grid container direction="row" sx={{ ml: { md: 4, lg: 4 } }} justifyContent='center' spacing={1}>
                            <Grid item>
                                <Box mt={2} sx={{ pr: 2}}>
                                    <Stack direction="column" alignItems="center">
                                        <Base64InputField size={100} name='img' label={t('sign_up_image')}></Base64InputField>
                                        <Typography variant="subtitle2">{memberGet.member_type_}</Typography>
                                    </Stack>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box sx={{ pt: 2, pl: 2, pr: 2, width: { md: 400 }}}>
                                    <Grid container spacing={matchDownSM ? 0 : 2}>
                                        <Grid item xs={12} sm={6}>
                                            <InputField name='name' label={t('sign_up_full_name')} type='text' InputProps={{readOnly: true}}></InputField>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <InputField name='nif' label={t('sign_up_nif')} type='text'></InputField>
                                        </Grid>
                                    </Grid>
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