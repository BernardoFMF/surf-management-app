import React, { useEffect, useState }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Dialog, DialogActions, DialogContent, Button, Box, Alert, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Form, Formik } from 'formik'
import LoadingButton from '@mui/lab/LoadingButton'
import AnimateButton from '../extended/AnimateButton';
import * as Yup from 'yup'
import DropdownInputField from '../multiStepForm/DropdownInputField'
import { updateMemberAttendance} from '../../store/actions/eventActions'


const AttendanceEditDialog = ({open, closeHandler, row}) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const update = useSelector((state) => state.memberEventAttendanceUpdate)
    const { loading, error, memberEventAttendanceUpdate } = update

    const handleSubmitUpdate = async (values) => {
        const state = values.state === t('going') ? 'going' : values.state === t('not going') ? 'not going' : 'interested'
        dispatch(updateMemberAttendance(row.event_id_, row.member_id_, state))
    }

    return (
        <Dialog
            PaperProps={{
                sx: {
                    width: 400
                }
            }}
            open={open}
            onClose={closeHandler}
        >
            <Typography sx={{pl: 5, pt: 5}}  variant="h2" component="h2">
                {t('update_attendance')}
            </Typography>
            <DialogContent>
                { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> }
                { memberEventAttendanceUpdate && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="success">{t('state_updated_successfully')}</Alert></Box> }
                <Box
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    m: 'auto',
                    width: 250,
                    }}
                >
                    <Formik
                        initialValues={{
                            state: row.state_ ? t(row.state_) : '',
                        }}
                        validationSchema={Yup.object().shape({
                            state: Yup.string().required(t('state_mandatory')),

                        })}
                        onSubmit={handleSubmitUpdate}
                    >
                    {Formik => (
                        <Grid item sx={{ ml: { md: 2, lg: 1 }}} >
                            <Form  >
                            <DropdownInputField name='state' label={t('state')} options={[t('going'), t('not going'), t('interested')]} type='text'/>
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
                        </Grid>
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

export default AttendanceEditDialog