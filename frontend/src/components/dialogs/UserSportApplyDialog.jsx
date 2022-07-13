import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Typography, Dialog, DialogActions, DialogContent, Button, Box, Alert, Stack, CircularProgress} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Form, Formik } from 'formik'
import LoadingButton from '@mui/lab/LoadingButton'
import AnimateButton from '../extended/AnimateButton';
import * as Yup from 'yup'
import InputField from '../multiStepForm/InputField'
import CheckGroupInputField from '../multiStepForm/CheckGroupInputField'
import ChipInputField from '../multiStepForm/ChipInputField'
import { createUsersSport } from '../../store/actions/userActions'
import { getUserSportsTypes } from '../../store/actions/sportActions'
import { USERS_SPORTS_CREATE_RESET } from '../../store/constants/userConstants'
import { USER_SPORT_TYPES_FETCH_RESET } from '../../store/constants/sportConstants'


const UserSportApplyDialog = ({open, closeHandler, sid, byAdmin}) => {
    const { t } = useTranslation()

    const dispatch = useDispatch()
    const create = useSelector((state) => state.usersSportsCreate)
    const { loading, error, usersSportsCreate } = create

    const member = useSelector((state) => state.memberLogin)
    const { memberInfo } = member

    const userSportsTypesFetch = useSelector((state) => state.userSportsTypesFetch)
    const { loading: loadingTypes, error: errorTypes, userSportsTypesGet } = userSportsTypesFetch

    const createUserSportHandler = (values) => {
        const body = {
            sid,
            fed_id: values.fed_id,
            fed_number: values.fed_number,
            fed_name: values.fed_name,
            type: values.type,
            years_federated: values.years_federated,
            is_candidate: byAdmin ? false : true
        }
        if (byAdmin) {
            dispatch(createUsersSport(values.id, body))
        } else {
            dispatch(createUsersSport(memberInfo.id_, body))
        }
    }

    useEffect(() => {
        dispatch(getUserSportsTypes())
    }, [])
    
    return (
        <>
            <Dialog
                PaperProps={{
                    sx: {
                        width: 500,
                        height: 'fit-content'
                    }
                }}
                open={open}
                onClose={closeHandler}
            >
                <Typography sx={{pl: 5, pt: 5}} id="modal-modal-title" variant="h2" component="h2">
                    {t('associate')}
                </Typography>
                <DialogContent>
                    { loadingTypes ? 
                    <Stack alignItems="center">
                        <CircularProgress size='4rem'/>
                    </Stack> : (
                        <>
                            { error && <Box sx={{ pt: 2 }}><Alert severity="error" onClose={() => dispatch({ type: USERS_SPORTS_CREATE_RESET })}>{t(error)}</Alert></Box> }
                            { errorTypes && <Box sx={{ pt: 2 }}><Alert severity="error" onClose={() => dispatch({ type: USER_SPORT_TYPES_FETCH_RESET })}>{t(error)}</Alert></Box> }
                            { usersSportsCreate && <Box sx={{ pt: 2 }}><Alert severity="success" onClose={() => dispatch({ type: USERS_SPORTS_CREATE_RESET })}>{t('application_sucessfully')}</Alert></Box> }
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
                                    enableReinitialize={true}
                                    initialValues={{
                                        id: byAdmin ? '' : memberInfo.id_,
                                        type:'',
                                        fed_number: '',
                                        fed_id: '',
                                        fed_name: '',
                                        years_federated: ''
                                    }}
                                    validationSchema={Yup.object().shape({
                                        id: Yup.number().required(t('associate_n_mandatory')),
                                        type: Yup.array().of(Yup.string()).min(1, t('sport_type_mandatory')),
                                        fed_number: Yup.string(),
                                        fed_id: Yup.string(),
                                        fed_name: Yup.string(),
                                        years_federated: Yup.array().of(Yup.number())
                                    })}
                                    onSubmit={createUserSportHandler}
                                >
                                {formik => (
                                    <Form>
                                        {byAdmin && <InputField name='id' label={t('associate_number')} type='number'></InputField>}
                                        <CheckGroupInputField
                                            name="type"
                                            label={t("types")}
                                            options={userSportsTypesGet}
                                        />
                                        <InputField name='fed_number' label={t('fed_number_')} type='text'></InputField>
                                        <InputField name='fed_id' label={t('fed_id_')} type='text'></InputField>
                                        <InputField name='fed_name' label={t('fed_name_')} type='text'></InputField>
                                        <Box sx={{ pt: 2, pb: 2 }}>
                                            <ChipInputField name='years_federated' label={t('years_federated_')} startingOptions={[]} type='number' placeholder={t('year')}></ChipInputField>
                                        </Box>
                                        <AnimateButton>
                                            <LoadingButton
                                                disableElevation
                                                fullWidth
                                                size="normal"
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                loading={loading}
                                            >
                                                {t('sign_up_submit')}
                                            </LoadingButton>
                                        </AnimateButton>
                                    </Form>
                                )}
                                </Formik>
                            </Box>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeHandler}>{t('close')}</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default UserSportApplyDialog