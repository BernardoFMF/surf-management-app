import { useState, useEffect } from 'react'
import { login, logout } from '../../../store/actions/memberActions'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import { isAfter } from "date-fns";
import { Link } from 'react-router-dom'

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    Alert
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton'

// third party
import * as Yup from 'yup'
import { Formik } from 'formik'

import AnimateButton from '../../../components/extended/AnimateButton'

// assets
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'


const AuthLogin = ({ ...others }) => {
    const theme = useTheme()
    const {t, i18n} = useTranslation()


    const navigate = useNavigate()
    const { state } = useLocation()
    const dispatch = useDispatch()
    const memberLogin = useSelector((state) => state.memberLogin)
    const { loading, error, memberInfo } = memberLogin

    const checkExpiration = (date) => {
        const curr = new Date()
        const expirationDate = new Date(date)
        return isAfter(curr, expirationDate)
    }

    useEffect(() => {
        async function logIn() {
            if (memberInfo) {
                const isExpired = checkExpiration(memberInfo.expires)
                if (isExpired) {
                    dispatch(logout())
                } else {
                    navigate((state && state.from) || '/dashboard/overview')
                }
            }
        }
        logIn()
    }, [memberInfo, error])

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault()
    };

    const handleSubmit = async (values) => {
        dispatch(login(values.username, values.password))
    }

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                </Grid>
                <Grid item xs={12} container alignItems="center" direction = "column" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">{t('sign_in_suggestion')}</Typography>
                    </Box>
                    {error && <Box sx={{ mb: 2 }}>
                    <Alert severity="error">{t(error)}</Alert>
                    </Box>}
                </Grid>
            </Grid>

            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string().max(255).required(t('sign_in_username_mandatory')),
                    password: Yup.string().max(255).required(t('sign_in_password_mandatory'))
                })}
                onSubmit={handleSubmit}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl fullWidth error={Boolean(touched.username && errors.username)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-text-login">{t('sign_in_username')}</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-text-login"
                                type="text"
                                value={values.username}
                                name="username"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Username"
                                inputProps={{}}
                            />
                            {touched.username && errors.username && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.username}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">{t('sign_in_password')}</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                            <Typography variant="subtitle1" component={Link} to="/password-reset" color="primary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                                {t('sign_in_new_password')}
                            </Typography>
                        </Stack>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <LoadingButton
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    loading = {loading}
                                >
                                    {t('sign_in_button')}
                                </LoadingButton>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    )
}

export default AuthLogin
