import { useState} from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
    useMediaQuery
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

// data
import countries from '../../../assets/data/countries.json'

const AuthRegister = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const customization = useSelector((state) => state.customization);

    const [showPassword, setShowPassword] = useState(false);
    const [checked, setChecked] = useState(true);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const parseDate = (originalValue) => {
        let parsedDate = isDate(originalValue)
          ? originalValue
          : parse(originalValue, "yyyy-MM-dd", new Date());

        return parsedDate
      }

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                    <Box sx={{ alignItems: 'center', display: 'flex' }}>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                </Grid>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Still not part of the club? Apply here.</Typography>
                    </Box>
                </Grid>
            </Grid>

            <MultiStepForm initialValues={{username: '', email: '', password: '', fullName: '', cc: '', nif: '', sex: '', nationality: '', birthDate: '', location: '', address: '', phoneNumber: '', postalCode: ''}}
            onSubmit={values => {
                console.log(values.birthDate.toString());
                values.birthDate = values.birthDate.toString().split('T')[0]
                alert(JSON.stringify(values, null, 2))
            }}>
                <FormStep stepName='User' validationSchema={Yup.object().shape({
                    username: Yup.string().required('Username is required'),
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}>
                    <InputField name='username' label='Username' type='text'></InputField>
                    <InputField name='email' label='Email' type='text'></InputField>
                    <PasswordInputField name='password' label='Password' 
                        showPassword={showPassword} endAdornment={
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
                        }>
                    </PasswordInputField>
                </FormStep>
                <FormStep stepName='Personal' validationSchema={Yup.object().shape({
                    fullName: Yup.string().required('Full name is required'),
                    cc: Yup.string().matches(/^[0-9]+$/, "Must be only digits").min(9, 'Must be exactly 9 digits').max(9, 'Must be exactly 9 digits').required('CC is required'),
                    nif: Yup.string().required('Nif is required').matches(/^[0-9]+$/, "Must be only digits").min(9, 'Must be exactly 9 digits').max(9, 'Must be exactly 9 digits'),
                    sex: Yup.string().required('Sex is required'),
                    nationality: Yup.string().required('Nationality is required'),
                    birthDate: Yup.date().transform(parseDate).max(new Date()).required('Birth Date is required')
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
                            <DropdownInputField name='sex' label='Sex' options={{M:'Male', F:'Female', O:'Other'}}></DropdownInputField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <DropdownInputField name='nationality' label='Nationality' options={countries}></DropdownInputField>
                        </Grid>
                    </Grid>
                    <DateInputField name='birthDate' label='BirthDate'></DateInputField>
                </FormStep>
                <FormStep stepName='Personal' validationSchema={Yup.object().shape({
                    location: Yup.string().required('Location is required'),
                    address: Yup.string().required('Address is required'),
                    postalCode: Yup.string().matches(/^\d{4}[-]\d{3}?$/, "Must be follow this pattern DDDD-DDD").required('Postal Code is required'),
                    phoneNumber: Yup.string().matches(/^[0-9]+$/, "Must be only digits").min(9, 'Must be exactly 9 digits').max(9, 'Must be exactly 9 digits')
                })}>
                    <InputField name='location' label='Location'></InputField>
                    <InputField name='address' label='Address'></InputField>
                    <InputField name='postalCode' label='PostalCode'></InputField>
                    <InputField name='phoneNumber' label='PhoneNumber'></InputField>
                </FormStep>
            </MultiStepForm>

        </>
    );
};

export default AuthRegister;