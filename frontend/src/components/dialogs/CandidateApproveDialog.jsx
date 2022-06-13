import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Dialog, DialogActions, DialogContent, Button, Box, Alert, Grid, FormControlLabel } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Form, Formik } from 'formik'
import LoadingButton from '@mui/lab/LoadingButton'
import AnimateButton from '../extended/AnimateButton';
import * as Yup from 'yup'
import { approveCandidate } from '../../store/actions/candidateActions'
import DropdownInputField from '../../components/multiStepForm/DropdownInputField';
import SwitchButton from '../../components/SwitchButton';

const CandidateApproveDialog = ({open, closeHandler, id}) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const typesFetch = useSelector((state) => state.typesFetch)
    const { error: errorTypes, typesGet } = typesFetch

    const approve = useSelector((state) => state.approveCandidate)
    const { loading, error, approveCandidate: approvalSuccess } = approve

    const approveCandidateHandle = async(values) => {
        dispatch(approveCandidate(id, values.member_type, values.paid_enrollment))
    }


    return (
        <Dialog
            PaperProps={{
                sx: {
                    width: 500
                }
            }}
            open={open}
            onClose={closeHandler}
        >
            <Typography sx={{pl: 5, pt: 5}} id="modal-modal-title" variant="h2" component="h2">
                {t('candidates_modal_title')}
            </Typography>
            <DialogContent>
                { errorTypes && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(errorTypes)}</Alert></Box> }
                { approvalSuccess && <Box sx={{ pt: 2 }}><Alert severity="success">{t('MESSAGE_CODE_4')}</Alert></Box> }
                { error && <Box sx={{ pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> }
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
                            member_type: '',
                            paid_enrollment: false
                        }}
                        validationSchema={Yup.object().shape({
                            member_type: Yup.string().required(t('candidates_modal_member_type_mandatory')),
                        })}
                        onSubmit={approveCandidateHandle}
                    >
                    {formik => (
                        <Form>
                            <Grid item xs={12} sm={6} paddingY={2} sx={{ width: {md: 300, xs: 200}, pb: 2}}>
                                <DropdownInputField name='member_type' label={t('candidates_modal_member_type')} options={typesGet.map(type => type.type_).reduce((o, key) => Object.assign(o, {[key]: key}), {})}></DropdownInputField>
                                <FormControlLabel onChange={formik.handleChange} control={<SwitchButton sx={{ m: 1 }} checked={formik.values.paid_enrollment} />}
                                    label={t('candidates_modal_paid_enrollment')} name='paid_enrollment' labelPlacement='start'
                                />
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

export default CandidateApproveDialog