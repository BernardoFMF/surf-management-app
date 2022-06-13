import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Dialog, DialogActions, DialogContent, Button, Box, Alert, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Form, Formik } from 'formik'
import LoadingButton from '@mui/lab/LoadingButton'
import AnimateButton from '../extended/AnimateButton';
import * as Yup from 'yup'
import { createEvent } from '../../store/actions/eventActions'

import InputField from '../../components/multiStepForm/InputField';
import DateInputField from '../../components/multiStepForm/DateInputField';
import { parse, isDate } from "date-fns";

const EventCreateDialog = ({open, closeHandler}) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const eventPost = useSelector((state) => state.createEvent)
    const { loading, error, createEvent: posted } = eventPost

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

    const handleSubmitCreate = async (values) => {
        let initial_date = formatDate(values.event_initial_date)
        let end_date = formatDate(values.event_end_date)
        dispatch(createEvent(values.name, initial_date, end_date))
    }


    return (
        <Dialog
            fullWidth={true}
            open={open}
            onClose={closeHandler}
        >
            <Typography sx={{pl: 5, pt: 5}}  variant="h2" component="h2">
                {t('create_event')}
            </Typography>
            <DialogContent>
                { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> }
                { posted && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="success">{t('event_created_successfully')}</Alert></Box> }
                <Box
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    m: '24',
                    width: 'fit-content'
                    }}
                >
                    <Formik
                        initialValues={{
                            name: '',
                            event_initial_date: '',
                            event_end_date: ''
                        }}
                        validationSchema={Yup.object().shape({
                            name: Yup.string().required(t('sign_up_username_mandatory')),
                            event_initial_date: Yup.date().transform(parseDate).typeError(t('sign_up_valid_date')).required(t('initial_date_mandatory')),
                            event_end_date: Yup.date().transform(parseDate).typeError(t('sign_up_valid_date')).required(t('end_date_mandatory')),
                        })}
                        onSubmit={handleSubmitCreate}
                    >
                    {Formik => (
                        <Form>
                            <Grid sx={{ml: {md : 1.5, lg : 3}}}>
                                <InputField name='name' label={t('name')} type='text'></InputField>
                                <Grid container spacing={1}>
                                    <Grid item xs>
                                        <DateInputField name='event_initial_date' label={t('event_initial_date')}></DateInputField>
                                    </Grid>
                                    <Grid item xs>
                                        <DateInputField name='event_end_date' label={t('event_end_date')}></DateInputField>
                                    </Grid>
                                </Grid>
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
                            </Grid>
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

export default EventCreateDialog