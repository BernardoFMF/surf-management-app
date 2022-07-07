import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import * as Yup from 'yup'
import LoadingButton from '@mui/lab/LoadingButton';
import { InputAdornment, IconButton, Box, Alert } from '@mui/material'
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputField from '../../../components/multiStepForm/PasswordInputField';
import PasswordInputField from '../../../components/multiStepForm/PasswordInputField'
import AnimateButton from '../../../components/extended/AnimateButton';
import { requestChangePassword, changePassword } from '../../../store/actions/memberActions';
import { CHANGE_PASSWORD_RESET, CHANGE_PASSWORD_REQUEST_RESET } from '../../../store/constants/memberConstants'

const AuthResetPassword = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch()

    let token = searchParams.get("token");
    let userId = searchParams.get("id");

    useEffect(() => {
        return () => {
            dispatch({ type: CHANGE_PASSWORD_RESET })
            dispatch({ type: CHANGE_PASSWORD_REQUEST_RESET })
        }
    }, [])

    return (
        <>
            {
                token && userId ? (
                    <ChangePassword token={token} id={userId} />
                ) : (
                    <RequestChangePassword />
                )
            }
        </>
    )
}

const RequestChangePassword = () => {
    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()

    const passwordChangeRequest = useSelector((state) => state.changePasswordRequest)
    const { loading, error, requested } = passwordChangeRequest

    const handleChangePasswordRequest = async (values) => {
        dispatch(requestChangePassword(values.email))
    }

    return (
        <>
            { error && <Box sx={{ pt: 2 }}><Alert severity="error" onClose={() => dispatch({ type: CHANGE_PASSWORD_REQUEST_RESET })}>{t(error)}</Alert></Box> }
            { requested && <Box sx={{ pt: 2 }}><Alert severity="success" onClose={() => dispatch({ type: CHANGE_PASSWORD_REQUEST_RESET })}>{t('password_requested_successfully')}</Alert></Box> }
            <Formik
                initialValues={{
                    email: ''
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email(t('sign_up_email_valid')).max(255).required(t('sign_up_email_mandatory')),
                })}
                onSubmit={handleChangePasswordRequest}
            >
            {Formik => (
                <Form>
                    <InputField name='email' label={t('sign_up_email')} type='text'></InputField>
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
        </>
    )
}

const ChangePassword = ({token, id}) => {
    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()

    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const handleChangePassword = async (values) => {
        dispatch(changePassword(token, id, values.password))
    }

    const passwordChange = useSelector((state) => state.changePassword)
    const { loading, error, updated } = passwordChange

    return (
        <>
            { error && <Box sx={{ pt: 2 }}><Alert severity="error" onClose={() => dispatch({ type: CHANGE_PASSWORD_RESET })}>{t(error)}</Alert></Box> }
            { updated && <Box sx={{ pt: 2 }}><Alert severity="success" onClose={() => dispatch({ type: CHANGE_PASSWORD_RESET })}>{t('password_changed_successfully')}</Alert></Box> }
            <Formik
                initialValues={{
                    password: ''
                }}
                validationSchema={Yup.object().shape({
                    password: Yup.string().max(255).required(t('sign_up_password_mandatory'))
                })}
                onSubmit={handleChangePassword}
            >
            {Formik => (
                <Form>
                    <PasswordInputField name='password' label={t('sign_up_password')}
                        showPassword={showPassword} endAdornment={<InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="large"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>}>
                    </PasswordInputField>
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
        </>
    )
}

export default AuthResetPassword