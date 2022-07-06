import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Dialog, DialogActions, DialogContent, Button, Box, Alert} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Form, Formik } from 'formik'
import LoadingButton from '@mui/lab/LoadingButton'
import AnimateButton from '../extended/AnimateButton';
import * as Yup from 'yup'
import { createQuota} from '../../store/actions/quotaActions'
import DateInputField from '../../components/multiStepForm/DateInputField';
import { parse, isDate } from "date-fns";
import { QUOTA_CREATE_RESET } from '../../store/constants/quotaConstants'

const QuotaCreateDialog = ({open, closeHandler}) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()

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

    const create = useSelector((state) => state.createQuota)
    const { loading, error, quotaCreate: message } = create

    
    const handleSubmitCreate = async (values) => {
        let date = formatDate(values.date)
        dispatch(createQuota(date))
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
            {t('quota_creation')}
        </Typography>
        <DialogContent>
            { message && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="success" onClose={() => dispatch({ type: QUOTA_CREATE_RESET })}>{t(message.message_code)}</Alert></Box> }
            { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error" onClose={() => dispatch({ type: QUOTA_CREATE_RESET })}>{t(error)}</Alert></Box> }
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
                        date: ''
                    }}
                    validationSchema={Yup.object().shape({
                        date: Yup.date().transform(parseDate).typeError(t('sign_up_valid_date')).required(t('sign_up_birth_date_mandatory')),
                    })}
                    onSubmit={handleSubmitCreate}
                >
                {Formik => (
                    <Form>
                        <DateInputField name='date' label={t('date')}></DateInputField>
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

export default QuotaCreateDialog