import React from 'react'
import { Box, Grid, Alert, Button, useMediaQuery, FormControlLabel } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next'
import SwitchButton from '../SwitchButton';
import { Formik, Form } from 'formik';
import { updateUser } from '../../store/actions/userActions';

import { useTheme } from '@mui/material/styles';

import AnimateButton from '../extended/AnimateButton';

import { useDispatch, useSelector } from 'react-redux';

const AdminPrivilegesTab = () => {
    const theme = useTheme()
    
    const { t } = useTranslation()

    const memberFetch = useSelector((state) => state.memberFetch)
    const { memberGet } = memberFetch

    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))

    const dispatch = useDispatch()

    const userUpdate = useSelector((state) => state.userUpdate)
    let { loading: loadingUpdate, error, updated } = userUpdate

    const handleSubmit = async (values) => {
        const updatedUser = { ...values, member_id: memberGet.member_id_, phone_number: memberGet.phone_number_, postal_code: memberGet.postal_code_, address: memberGet.address_, location: memberGet.location_, username: memberGet.username_, email: memberGet.email_, gender: memberGet.gender_, nationality: memberGet.nationality_, full_name: memberGet.full_name_, cc: memberGet.cc_, nif: memberGet.nif_, birth_date: memberGet.birth_date_, img: memberGet.img_value_ }
        dispatch(updateUser(updatedUser))
    }

    return (
        <>
            { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> }
            { updated && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="success" onClose={() => {updated = false }}>{t('updated_sucessfully')}</Alert></Box> }
            <Formik
                initialValues={{
                    is_deleted: memberGet.is_deleted_
                }}
                validationSchema={Yup.object().shape({
                    is_deleted: Yup.bool().required(t('update_is_deleted_mandatory'))
                })}
                onSubmit={handleSubmit}
            >
            {formik => (
                <Form>
                    <Grid container direction="column" sx={{ ml: { md: 4, lg: 4 } }} justifyContent='center' spacing={1}>
                        <Grid item>
                            {
                                memberGet.is_deleted_ && ( <>
                                    <Box justifyContent='center' sx={{ pt: 2, width: { md: 400 }}}>
                                        <FormControlLabel onChange={formik.handleChange} control={<SwitchButton sx={{ m: 1 }} checked={formik.values.is_deleted} />}
                                        label="is deleted" name='is_deleted' labelPlacement='start'
                                        />
                                    </Box>
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
                                </>)
                            }
                            
                        </Grid>
                    </Grid>
                </Form>
            )}
            </Formik>
      </>
    )
}

export default AdminPrivilegesTab