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
import { changeCredentials } from '../../../store/actions/memberActions';
import { CHANGE_CREDENTIALS_RESET } from '../../../store/constants/memberConstants'

const AuthChangeCredentials = () => {
    const { t } = useTranslation()
    let [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch()

    let token = searchParams.get("token");
    let userId = searchParams.get("id");

    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const handleChangeCredentials = async (values) => {
        dispatch(changeCredentials(token, userId, values.email, values.username, values.password))
    }

    const credentialsChange = useSelector((state) => state.changeCredentials)
    const { loading, error, updated } = credentialsChange

    useEffect(() => {
        return () => {
            dispatch({ type: CHANGE_CREDENTIALS_RESET })
        }
    }, [])

    return (
        <>
            {
                token && userId ? (
                    <>
                        { error && <Box sx={{ pt: 2 }}><Alert severity="error" onClose={() => dispatch({ type: CHANGE_CREDENTIALS_RESET })}>{t(error)}</Alert></Box> }
                        { updated && <Box sx={{ pt: 2 }}><Alert severity="success" onClose={() => dispatch({ type: CHANGE_CREDENTIALS_RESET })}>{t('credentials_changed_successfully')}</Alert></Box> }
                        <Formik
                            initialValues={{
                                email: '',
                                username: '',
                                password: ''
                            }}
                            validationSchema={Yup.object().shape({
                                email: Yup.string().email(t('sign_up_email_valid')).max(255).required(t('sign_up_email_mandatory')),
                                username: Yup.string().max(255).required(t('sign_in_username_mandatory')),
                                password: Yup.string().max(255).required(t('sign_up_password_mandatory'))
                            })}
                            onSubmit={handleChangeCredentials}
                        >
                        {Formik => (
                            <Form>
                                <InputField name='email' label={t('sign_up_email')} type='text'></InputField>
                                <InputField name='username' label={t('sign_up_username')} type='text'></InputField>
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
                ) : (
                    <Box sx={{ pt: 2 }}>
                        <Alert severity="error">
                            {t("no_token_or_id")}
                        </Alert>
                    </Box>
                )
            }
        </>
    )
}

export default AuthChangeCredentials