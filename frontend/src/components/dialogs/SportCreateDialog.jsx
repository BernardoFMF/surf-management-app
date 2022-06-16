import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Dialog, DialogActions, DialogContent, Button, Box, Alert, Grid} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Form, Formik } from 'formik'
import LoadingButton from '@mui/lab/LoadingButton'
import AnimateButton from '../extended/AnimateButton';
import * as Yup from 'yup'
import InputField from '../multiStepForm/InputField'
import { createSport} from '../../store/actions/sportActions'

const QuotaManagementCreateDialog = ({open, closeHandler}) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const create = useSelector((state) => state.createSport)
    const { loading, error, createSport: message } = create

    const handleSubmitCreate = async (values) => {
        dispatch(createSport(values.name))
    }

    return (
        <Dialog
            PaperProps={{
                sx: {
                    width: 300,
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
                { message && <Box sx={{ pl: { md: 2 }, pb: 2 }}><Alert variant="outlined" severity="success">{t('sport_create_alert')}</Alert></Box> }
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
                            name: '',
                        }}
                        validationSchema={Yup.object().shape({
                            name: Yup.string().required(t('all_sports_name_mandatory')),
                        })}
                        onSubmit={handleSubmitCreate}
                    >
                    {formik => (
                        <Form  >
                            <InputField name='name' label={t('all_sports_name')} type='text'>
                            </InputField>
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