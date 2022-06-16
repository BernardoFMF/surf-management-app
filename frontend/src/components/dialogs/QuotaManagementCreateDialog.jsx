import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Dialog, DialogActions, DialogContent, Button, Box, Alert, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Form, Formik } from 'formik'
import LoadingButton from '@mui/lab/LoadingButton'
import AnimateButton from '../extended/AnimateButton';
import * as Yup from 'yup'
import InputField from '../multiStepForm/InputField'
import { createType } from '../../store/actions/typeActions'
import DropdownInputField from '../../components/multiStepForm/DropdownInputField';

const QuotaManagementCreateDialog = ({open, closeHandler}) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const create = useSelector((state) => state.createType)
    const { loading, error, createType: message } = create

    const handleSubmitCreate = async (values) => {
        dispatch(createType(values.type, values.quota_value, values.category))
    }

    return (
        <Dialog
        PaperProps={{
            sx: {
            width: 400,
            height: 'fit-content'
            }
        }}
        open={open}
        onClose={closeHandler}
        >
            <Typography sx={{pl: 5, pt: 5}} id="modal-modal-title" variant="h2" component="h2">
                {t('create')}
            </Typography>
            <DialogContent>
                { error && <Box sx={{ pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> }
                { message && <Box sx={{ pl: { md: 2 }, pb: 2 }}><Alert variant="outlined" severity="success">{t('management_create_alert')}</Alert></Box> }
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        m: 'auto',
                        width: 'fit-content',
                        mt: 1
                    }}
                >
                    <Formik
                        initialValues={{
                            type: '',
                            quota_value: '', 
                            category: ''
                        }}
                        validationSchema={Yup.object().shape({
                            type: Yup.string().required(t('management_type_mandatory')),
                            quota_value: Yup.string().required(t('management_quota_value_mandatory')),
                            category: Yup.string().required(t('category_mandatory'))
                        })}
                        onSubmit={handleSubmitCreate}
                        >
                        {formik => (
                            <Form  >
                                <InputField name='type' label={t('management_quota_type')} type='text'>
                                </InputField>
                                <InputField name='quota_value' label={t('management_quota_value')} type='text'>
                                </InputField>
                                <DropdownInputField name='category' label={t('category')} options={['user', 'company']}></DropdownInputField>
                                <br/>
                                <AnimateButton>
                                    <LoadingButton
                                        disableElevation
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        loading = {loading}
                                    >
                                        {t('management_submit')}
                                    </LoadingButton>
                                </AnimateButton>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeHandler}>{t('close')}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default QuotaManagementCreateDialog