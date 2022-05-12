import React, { useEffect } from 'react'
import SwitchButton from '../SwitchButton'
import AnimateButton from '../extended/AnimateButton';
import { Alert, Box, Grid, useMediaQuery, Button, FormControlLabel, Stack, CircularProgress } from '@mui/material';
import { updateUser } from '../../store/actions/userActions'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import DropdownInputField from '../multiStepForm/DropdownInputField';
import { useTheme } from '@mui/material/styles';

const AdminPrivilegesTab = ({ user }) => {
    const theme = useTheme()
    
    const {t, i18n} = useTranslation()

    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))

    const dispatch = useDispatch()

    const userUpdate = useSelector((state) => state.userUpdate)
    let { error, updated } = userUpdate

    const typesFetch = useSelector((state) => state.typesFetch)
    const { error: errorTypes, typesGet } = typesFetch

    const handleSubmit = async (values) => {
        const updatedUser = { ...values, member_id: user.member_id_, phone_number: user.phone_number_, postal_code: user.postal_code_, address: user.address_, location: user.location_, username: user.username_, email: user.email_, gender: user.gender_, nationality: user.nationality_, full_name: user.full_name_, cc: user.cc_, nif: user.nif_, birth_date: user.birth_date_, img: user.img_value_ }
        dispatch(updateUser(updatedUser))
    }

    return (
        <>
            { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> }
            { errorTypes && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(errorTypes)}</Alert></Box> }
            { updated && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="success" onClose={() => {updated = false }}>{t('updated_sucessfully')}</Alert></Box> }
            <Formik
                initialValues={{
                    type: user.member_type_, 
                    paid_enrollment: user.paid_enrollment_, 
                    is_admin: user.is_admin_,
                    is_deleted: user.is_deleted_
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
                    <Grid container direction="column" sx={{ ml: { md: 4, lg: 4 } }} justifyContent='center' spacing={1}>
                        <Grid item>
                            <Box sx={{ pt: 2, width: { md: 400 }}}>
                                <DropdownInputField name='type' label={t('type')} options={typesGet.map(type => type.type_).reduce((o, key) => Object.assign(o, {[key]: key}), {})}></DropdownInputField>
                            </Box>
                            <Box justifyContent='center' sx={{ pt: 2, width: { md: 400 }}}>
                                <FormControlLabel onChange={formik.handleChange} control={<SwitchButton sx={{ m: 1 }} checked={formik.values.paid_enrollment} />}
                                  label="paid enrollment" name='paid_enrollment' labelPlacement='start'
                                />
                            </Box>
                            <Box justifyContent='center' sx={{ pt: 2, width: { md: 400 }}}>
                                <FormControlLabel onChange={formik.handleChange} control={<SwitchButton sx={{ m: 1 }} checked={formik.values.is_admin} />}
                                  label="is admin" name='is_admin' labelPlacement='start'
                                />
                            </Box>
                            {
                                user.is_deleted_ && 
                                    <Box justifyContent='center' sx={{ pt: 2, width: { md: 400 }}}>
                                        <FormControlLabel onChange={formik.handleChange} control={<SwitchButton sx={{ m: 1 }} checked={formik.values.is_deleted} />}
                                          label="is deleted" name='is_deleted' labelPlacement='start'
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
                                            <Button
                                            disableElevation
                                            disabled={formik.isSubmitting}
                                            fullWidth
                                            size="normal"
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            >
                                                {t('sign_up_submit')}
                                            </Button>
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

export default AdminPrivilegesTab