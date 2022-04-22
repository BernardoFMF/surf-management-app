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

    const parseDate = (value, originalValue) => {
        const parsedDate = isDate(originalValue)
          ? originalValue
          : parse(originalValue, "yyyy-MM-dd", new Date());
      
        return parsedDate;
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

            <MultiStepForm initialValues={{username: '', password: ''}} onSubmit={values => {
                alert(JSON.stringify(values, null, 2))
            }}>
                <FormStep stepName='Person' onSubmit={() => console.log('Step Person')} validationSchema={Yup.object().shape({
                    username: Yup.string().required('Username is required')
                })}>
                    <InputField name='username' label='Username'>
                    </InputField>
                </FormStep>
                <FormStep stepName='Dog' onSubmit={() => console.log('Step Dog')} validationSchema={Yup.object().shape({
                    password: Yup.string().required('Password is required')
                })}>
                    <InputField name='password' label='Password'>
                    </InputField>
                </FormStep>
            </MultiStepForm>

        </>
    );
};

export default AuthRegister;