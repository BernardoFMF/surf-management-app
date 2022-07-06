import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Dialog, DialogActions, DialogContent, Button, Box, Alert} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Form, Formik } from 'formik'
import LoadingButton from '@mui/lab/LoadingButton'
import AnimateButton from '../extended/AnimateButton';
import * as Yup from 'yup'
import { updateQuota} from '../../store/actions/quotaActions'
import DateInputField from '../../components/multiStepForm/DateInputField';
import { parse, isDate } from "date-fns";
import { QUOTA_UPDATE_RESET } from '../../store/constants/quotaConstants'

const QuotaUpdateDialog = ({open, closeHandler, id}) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()

    let datePlus1 = new Date()
    datePlus1.setDate(datePlus1.getDate() + 1)

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    const parseDate = (originalValue) => {
        let parsedDate = isDate(originalValue)
            ? originalValue
            : parse(originalValue, "yyyy-MM-dd", new Date())

        return parsedDate
    }

    const update = useSelector((state) => state.quotaUpdate)
    const { loading, error, quotaPut: message } = update

    const updateQuotaHandle = async(values) => {
        let date = formatDate(values.payment_date)
        dispatch(updateQuota(date, id))
    }

    return (
        <Dialog
            PaperProps={{
                sx: {
                width: 350,
                height: 'fit-content'
                }
            }}
            open={open}
            onClose={closeHandler}
        >
            <Typography sx={{pl: 5, pt: 5}}  variant="h2" component="h2">
                {t('payment_date')}
            </Typography>
            <DialogContent>
                { message && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="success" onClose={() => dispatch({ type: QUOTA_UPDATE_RESET })}>{t('quota_updated')}</Alert></Box> }
                { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error" onClose={() => dispatch({ type: QUOTA_UPDATE_RESET })}>{t(error)}</Alert></Box> }
                <Box
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    m: 'auto',
                    width: 'fit-content',
                    }}
                >
                    <Formik
                        initialValues={{
                            payment_date: ''
                        }}
                        validationSchema={Yup.object().shape({
                            payment_date: Yup.date().transform(parseDate).typeError(t('sign_up_valid_date')).max(datePlus1, t('sign_up_max_date')).required(t('sign_up_birth_date_mandatory')),
                        })}
                        onSubmit={updateQuotaHandle}
                    >
                    {Formik => (
                        <Form>
                            <DateInputField name='payment_date' label={t('payment_date')}></DateInputField>
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
                                    {t('confirm')}
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

export default QuotaUpdateDialog