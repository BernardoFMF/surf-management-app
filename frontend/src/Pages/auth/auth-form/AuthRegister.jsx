import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { parse, isDate } from "date-fns";

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
    TextField,
    Typography,
    useMediaQuery,
    Alert
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from '../../../hooks/useScriptRef'
import AnimateButton from '../../../components/extended/AnimateButton'

// assets
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import InputField from '../../../components/multi-step-form/InputField';
import PasswordInputField from '../../../components/multi-step-form/PasswordInputField';
import DateInputField from '../../../components/multi-step-form/DateInputField';
import MultiStepForm, { FormStep } from '../../../components/multi-step-form/MultiStepForm';
import DropdownInputField from '../../../components/multi-step-form/DropdownInputField';
import ImageInputField from '../../../components/multi-step-form/ImageInputField';


// data
import countries from '../../../assets/data/countries.json'
import { borderRadius } from '@mui/system';
import { signUp } from '../../../store/actions/userActions';

const AuthRegister = ({ ...others }) => {
    const theme = useTheme()
    const scriptedRef = useScriptRef()
    const dispatch = useDispatch()
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))
    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userRegistration } = userRegister

    const [showPassword, setShowPassword] = useState(false)
    const [checked, setChecked] = useState(true)
    const [submitted, setSubmitted] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    useEffect(() => {
        if (userRegistration) {
            console.log(userRegistration)
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
        if (values.image) {
            const buffer = await values.image.arrayBuffer()
            img = new Int8Array(buffer)
        }
        let bdate = values.birthDate.toLocaleString().split(',')[0]
        bdate = bdate.split('/')
        const date = `${bdate[2]}-${bdate[1]}-${bdate[0]}`
        dispatch(signUp({full_name: values.fullName,birth_date: date, gender: values.gender, cc: values.cc, nif: values.nif, username: values.username,
             email: values.email, password: values.password, nationality: values.nationality, location: values.location, address: values.address,
              phone_number: values.phoneNumber, postal_code: values.postalCode, img}))
    }

    return (
        <>
            {submitted ? <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Thanks for applying. We will send you an email after verifying your application.</Typography>
                    </Box>
                </Grid> : (<><Grid container direction="column" justifyContent="center" spacing={2}>
                    <Grid item xs={12}>
                        <Box sx={{ alignItems: 'center', display: 'flex' }}>
                            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                        </Box>
                    </Grid>
                    <Grid item xs={12} container alignItems="center" justifyContent="center">
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle1">Still not part of the club? Apply here.</Typography>
                        </Box>
                        {error && <Box sx={{ mb: 2 }}>
                        <Alert severity="error">{error}</Alert>
                        </Box>}
                    </Grid>
                </Grid><MultiStepForm initialValues={{ username: '', email: '', password: '', fullName: '', cc: '', nif: '', gender: '', nationality: '', birthDate: '', location: '', address: '', phoneNumber: '', postalCode: '', image: null }}
                    onSubmit={handleSubmit}>
                        <FormStep stepName='User' validationSchema={Yup.object().shape({
                            username: Yup.string().required('Username is required'),
                            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                            password: Yup.string().max(255).required('Password is required')
                        })}>
                            <InputField name='username' label='Username' type='text'></InputField>
                            <InputField name='email' label='Email' type='text'></InputField>
                            <PasswordInputField name='password' label='Password'
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
                            fullName: Yup.string().required('Full name is required'),
                            cc: Yup.string().matches(/^[0-9]+$/, "Must be only digits").min(9, 'Must be exactly 9 digits').max(9, 'Must be exactly 9 digits').required('CC is required'),
                            nif: Yup.string().required('Nif is required').matches(/^[0-9]+$/, "Must be only digits").min(9, 'Must be exactly 9 digits').max(9, 'Must be exactly 9 digits'),
                            gender: Yup.string().required('Gender is required'),
                            nationality: Yup.string().required('Nationality is required'),
                            birthDate: Yup.date().transform(parseDate).typeError('Enter a valid date').max(new Date()).required('Birth Date is required')
                        })}>
                            <InputField name='fullName' label='Full Name' type='text'></InputField>
                            <Grid container spacing={matchDownSM ? 0 : 2}>
                                <Grid item xs={12} sm={6}>
                                    <InputField name='cc' label='CC' type='text'></InputField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputField name='nif' label='NIF' type='text'></InputField>
                                </Grid>
                            </Grid>
                            <Grid container spacing={matchDownSM ? 0 : 2}>
                                <Grid item xs={12} sm={6}>
                                    <DropdownInputField name='gender' label='Gender' options={{ M: 'Male', F: 'Female', O: 'Other' }}></DropdownInputField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <DropdownInputField name='nationality' label='Nationality' options={countries}></DropdownInputField>
                                </Grid>
                            </Grid>
                            <DateInputField name='birthDate' label='Birth Date'></DateInputField>
                        </FormStep>
                        <FormStep stepName='Personal' validationSchema={Yup.object().shape({
                            location: Yup.string().required('Location is required'),
                            address: Yup.string().required('Address is required'),
                            postalCode: Yup.string().matches(/^\d{4}[-]\d{3}?$/, "Must be follow this pattern DDDD-DDD").required('Postal Code is required'),
                            phoneNumber: Yup.string().matches(/^[0-9]+$/, "Must be only digits").min(9, 'Must be exactly 9 digits').max(9, 'Must be exactly 9 digits')
                        })}>
                            <InputField name='location' label='Location'></InputField>
                            <InputField name='address' label='Address'></InputField>
                            <InputField name='postalCode' label='Postal Code'></InputField>
                            <InputField name='phoneNumber' label='Phone Number'></InputField>
                        </FormStep>
                        <FormStep stepName='Photo' validationSchema={Yup.object().shape({
                            image: Yup.mixed().test('FILE_SIZE', 'Image is too big', value => value == null ? true : (value.size / 1024 / 1024) <= 10).test('FILE_FORMAT', 'Image has unsupported format', value => value == null ? true : ['image/jpeg', 'image/png'].includes(value.type)).typeError('Choose a valid image')
                        })}>
                            <ImageInputField name='image' label='Image'></ImageInputField>
                        </FormStep>
                    </MultiStepForm></>)}
            

        </>
    );
};

export default AuthRegister;