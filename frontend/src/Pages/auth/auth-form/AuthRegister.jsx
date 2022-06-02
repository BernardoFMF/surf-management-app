import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { parse, isDate } from "date-fns";
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom';


// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    Typography,
    useMediaQuery,
    Alert,
    Stack
} from '@mui/material';

// third party
import * as Yup from 'yup';


// assets
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import InputField from '../../../components/multiStepForm/InputField';
import PasswordInputField from '../../../components/multiStepForm/PasswordInputField';
import DateInputField from '../../../components/multiStepForm/DateInputField';
import MultiStepForm, { FormStep } from '../../../components/multiStepForm/MultiStepForm';
import DropdownInputField from '../../../components/multiStepForm/DropdownInputField';
import ImageInputField from '../../../components/multiStepForm/ImageInputField';


// data
import countries from '../../../assets/data/countries.json'
import { signUp } from '../../../store/actions/userActions';

const AuthRegister = ({ ...others }) => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const {t, i18n} = useTranslation()
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))
    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userRegistration } = userRegister

    const [showPassword, setShowPassword] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    useEffect(() => {
        if (userRegistration) {
            setSubmitted(true)
        }
    }, [userRegistration])

    const parseDate = (originalValue) => {
        let parsedDate = isDate(originalValue)
            ? originalValue
            : parse(originalValue, "yyyy-MM-dd", new Date())

        return parsedDate
    }

    const handleSubmit = async (values) => {
        let img = null
        let bdate = values.birthDate.toLocaleString().split(',')[0]
        bdate = bdate.split('/')
        const date = `${bdate[2]}-${bdate[1]}-${bdate[0]}`
        if (values.image) {
            const buffer = await values.image.arrayBuffer()
            img = new Int8Array(buffer)
            var reader = new FileReader();
            reader.onload = function () {
                let base64String = reader.result.replace("data:", "")
                    .replace(/^.+,/, "");
                base64String = 'data:image/jpeg;base64,' + base64String

                dispatch(signUp({full_name: values.fullName,birth_date: date, gender: values.gender, cc: values.cc, nif: values.nif, username: values.username, email: values.email, password: values.password, nationality: values.nationality, location: values.location, address: values.address, phone_number: values.phoneNumber, postal_code: values.postalCode, img: base64String, iban: values.iban}))
            }
            reader.readAsDataURL(values.image);
        } else {
            dispatch(signUp({full_name: values.fullName,birth_date: date, gender: values.gender, cc: values.cc, nif: values.nif, username: values.username, email: values.email, password: values.password, nationality: values.nationality, location: values.location, address: values.address, phone_number: values.phoneNumber, postal_code: values.postalCode, img, iban: values.iban}))
        }
    }

    return (
        <>
            <Grid item xs={12}>
                <Grid
                    container
                    direction={matchDownSM ? 'column-reverse' : 'row'}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                            <Typography
                                color={theme.palette.primary.main}
                                gutterBottom
                                variant={matchDownSM ? 'h3' : 'h2'}
                            >
                                {submitted ? t('sign_up_thank_you_header') : t('sign_up_welcome')}
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
            {submitted ? <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">{t('sign_up_thank_you')}</Typography>
                    </Box>
                </Grid> : (<>
                
                <Grid container direction="column" justifyContent="center" spacing={2}>
                    <Grid item xs={12}>
                        <Box sx={{ alignItems: 'center', display: 'flex' }}>
                            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                        </Box>
                    </Grid>
                    <Grid item xs={12} container alignItems="center" justifyContent="center">
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle1">{t('sign_up_suggestion')}</Typography>
                        </Box>
                        {error && <Box sx={{ mb: 2 }}>
                        <Alert severity="error">{t(error)}</Alert>
                        </Box>}
                    </Grid>
                </Grid>
                <MultiStepForm initialValues={{ username: '', email: '', password: '', fullName: '', iban: '', cc: '', nif: '', gender: '', nationality: '', birthDate: '', location: '', address: '', phoneNumber: '', postalCode: '', image: null }}
                    onSubmit={handleSubmit}>
                        <FormStep stepName='User' validationSchema={Yup.object().shape({
                            username: Yup.string().required(t('sign_up_username_mandatory')),
                            email: Yup.string().email(t('sign_up_email_valid')).max(255).required(t('sign_up_email_mandatory')),
                            password: Yup.string().max(255).required(t('sign_up_password_mandatory'))
                        })}>
                            <InputField name='username' label={t('sign_up_username')} type='text'></InputField>
                            <InputField name='email' label={t('sign_up_email')} type='text'></InputField>
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
                        </FormStep>
                        <FormStep stepName='Personal' validationSchema={Yup.object().shape({
                            fullName: Yup.string().required(t('sign_up_full_name_mandatory')),
                            iban: Yup.string().required(t('sign_up_iban_mandatory')).test('len', t('sign_up_iban_mandatory'), val => val ? val.length === 25 : true),
                            cc: Yup.string().matches(/^[0-9]+$/, t('sign_up_only_digits')).min(9, t('sign_up_exact_nine')).max(9,  t('sign_up_exact_nine')).required( t('sign_up_cc_mandatory')),
                            nif: Yup.string().required(t('sign_up_nif_mandatory')).matches(/^[0-9]+$/, t('sign_up_only_digits')).min(9,  t('sign_up_exact_nine')).max(9,  t('sign_up_exact_nine')),
                            gender: Yup.string().required(t('sign_up_gender_mandatory')),
                            nationality: Yup.string().required(t('sign_up_nationality_mandatory')),
                            birthDate: Yup.date().transform(parseDate).typeError(t('sign_up_valid_date')).max(new Date(), t('sign_up_max_date')).required(t('sign_up_birth_date_mandatory'))
                        })}>
                            <InputField name='fullName' label={t('sign_up_full_name')} type='text'></InputField>
                            <InputField name='iban' label='IBAN' type='text'></InputField>
                            <Grid container spacing={matchDownSM ? 0 : 2}>
                                <Grid item xs={12} sm={6}>
                                    <InputField name='cc' label={t('sign_up_cc')} type='text'></InputField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputField name='nif' label={t('sign_up_nif')} type='text'></InputField>
                                </Grid>
                            </Grid>
                            <Grid container spacing={matchDownSM ? 0 : 2}>
                                <Grid item xs={12} sm={6}>
                                    <DropdownInputField name='gender' label={t('sign_up_gender')} options={{ M: t('male'), F: t('female'), O: t('other') }}></DropdownInputField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <DropdownInputField name='nationality' label={t('sign_up_nationality')} options={countries}></DropdownInputField>
                                </Grid>
                            </Grid>
                            <DateInputField name='birthDate' label={t('sign_up_birth_date')}></DateInputField>
                        </FormStep>
                        <FormStep stepName='Personal' validationSchema={Yup.object().shape({
                            location: Yup.string().required(t('sign_up_location_mandatory')),
                            address: Yup.string().required(t('sign_up_address_mandatory')),
                            postalCode: Yup.string().matches(/^\d{4}[-]\d{3}?$/, t('sign_up_postal_code_pattern')).required(t('sign_up_postal_code_mandatory')),
                            phoneNumber: Yup.string().matches(/^[0-9]+$/, t('sign_up_only_digits')).min(9, t('sign_up_exact_nine')).max(9, t('sign_up_exact_nine')).required(t('sign_up_phone_number_mandatory'))
                        })}>
                            <InputField name='location' label={t('sign_up_location')}></InputField>
                            <InputField name='address' label={t('sign_up_address')}></InputField>
                            <InputField name='postalCode' label={t('sign_up_postal_code')}></InputField>
                            <InputField name='phoneNumber' label={t('sign_up_phone_number')}></InputField>
                        </FormStep>
                        <FormStep stepName='Photo' validationSchema={Yup.object().shape({
                            image: Yup.mixed().test('FILE_SIZE', t('sign_up_image_too_big'), value => value == null ? true : (value.size / 1024 / 1024) <= 10).test('FILE_FORMAT', t('sign_up_image_format'), value => value == null ? true : ['image/jpeg', 'image/png'].includes(value.type)).typeError(t('sign_up_valid_image'))
                        })}>
                            <ImageInputField size={200} name='image' label={t('sign_up_image')}></ImageInputField>
                        </FormStep>
                    </MultiStepForm>
                    <Grid item xs={12} sx={{ mt: { xs: 2, md: 2}, mb: { xs: 2, md: 2}}}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item container direction="column" alignItems="center" xs={12}>
                            <Typography
                                component={Link}
                                to="/sign-in"
                                variant="subtitle1"
                                sx={{ textDecoration: 'none' }}
                            >
                                {t('sign_up_to_sign_in')}
                            </Typography>
                        </Grid>
                    </Grid>
                </>)}
        </>
    );
};

export default AuthRegister;