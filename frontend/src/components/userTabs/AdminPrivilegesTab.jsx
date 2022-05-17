import React, { useEffect } from 'react'
import SwitchButton from '../SwitchButton'
import AnimateButton from '../extended/AnimateButton';
import { Alert, Box, Grid, useMediaQuery, Button, FormControlLabel, Stack, CircularProgress } from '@mui/material';
import { updateUser } from '../../store/actions/userActions'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next'
import { Formik, Form } from 'formik';
import LoadingButton from '@mui/lab/LoadingButton';
import * as Yup from 'yup';
import DropdownInputField from '../multiStepForm/DropdownInputField';
import { useTheme } from '@mui/material/styles';
import { getTypes } from '../../store/actions/typeActions'

const AdminPrivilegesTab = () => {
    const theme = useTheme()
    
    const { t } = useTranslation()

    const memberFetch = useSelector((state) => state.memberFetch)
    const { memberGet } = memberFetch

    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))

    const dispatch = useDispatch()

    const userUpdate = useSelector((state) => state.userUpdate)
    let { loading: loadingUpdate, error, updated } = userUpdate

    const typesFetch = useSelector((state) => state.typesFetch)
    const { loading, error: errorTypes, typesGet } = typesFetch

    useEffect(() => {
        dispatch(getTypes())
    },[dispatch])

    const handleSubmit = async (values) => {
        const updatedUser = { ...values, member_id: memberGet.member_id_, phone_number: memberGet.phone_number_, postal_code: memberGet.postal_code_, address: memberGet.address_, location: memberGet.location_, username: memberGet.username_, email: memberGet.email_, gender: memberGet.gender_, nationality: memberGet.nationality_, full_name: memberGet.full_name_, cc: memberGet.cc_, nif: memberGet.nif_, birth_date: memberGet.birth_date_, img: memberGet.img_value_ }
        dispatch(updateUser(updatedUser))
    }

    return (
        <>
            {
                loading || !typesGet || (typesGet && typesGet.length === 0) ?
                    <Stack alignItems="center">
                        <CircularProgress size='4rem'/>
                    </Stack>
                : (
                    <>
                        { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> }
                        { errorTypes && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(errorTypes)}</Alert></Box> }
                        { updated && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="success" onClose={() => {updated = false }}>{t('updated_sucessfully')}</Alert></Box> }
                        <Formik
                            initialValues={{
                                type: memberGet.member_type_, 
                                paid_enrollment: memberGet.paid_enrollment_, 
                                is_admin: memberGet.is_admin_,
                                is_deleted: memberGet.is_deleted_
                            }}
                            validationSchema={Yup.object().shape({
                                type: Yup.string().required(t('update_type_mandatory')),
                                paid_enrollment: Yup.bool().required(t('update_paid_enrollment_mandatory')),
                                is_admin: Yup.bool().required(t('update_is_admin_mandatory')),
                                is_deleted: Yup.bool().required(t('update_is_deleted_mandatory'))
                            })}
                            onSubmit={handleSubmit}
                        >
                        {formik => (
                            <Form>
                                <Grid container direction="row" sx={{ ml: { md: 4, lg: 4 } }} justifyContent='center' spacing={1}>
                                    <Grid item>
                                        <Box sx={{ pt: 2, width: { md: 400 }}}>
                                            <DropdownInputField name='type' label={t('type')} options={typesGet.map(type => type.type_).reduce((o, key) => Object.assign(o, {[key]: key}), {})}></DropdownInputField>
                                        </Box>
                                        <Box justifyContent='center' sx={{ pt: 2, width: { md: 400 }}}>
                                            <FormControlLabel onChange={formik.handleChange} control={<SwitchButton sx={{ m: 1 }} checked={formik.values.paid_enrollment} />}
                                            label={t("paid_enrollment_")} name='paid_enrollment' labelPlacement='start'
                                            />
                                        </Box>
                                        <Box justifyContent='center' sx={{ pt: 2, width: { md: 400 }}}>
                                            <FormControlLabel onChange={formik.handleChange} control={<SwitchButton sx={{ m: 1 }} checked={formik.values.is_admin} />}
                                            label={t("is_admin_")} name='is_admin' labelPlacement='start'
                                            />
                                        </Box>
                                        {
                                            memberGet.is_deleted_ && 
                                                <Box justifyContent='center' sx={{ pt: 2, width: { md: 400 }}}>
                                                    <FormControlLabel onChange={formik.handleChange} control={<SwitchButton sx={{ m: 1 }} checked={formik.values.is_deleted} />}
                                                    label={t("is_deleted_")} name='is_deleted' labelPlacement='start'
                                                    />
                                                </Box>
                                        }
                                        <Box sx={{ pt: 2, width: { md: 400 }}}>
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
                                                            loading = {loadingUpdate}
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
            
      </>
    )
}

export default AdminPrivilegesTab