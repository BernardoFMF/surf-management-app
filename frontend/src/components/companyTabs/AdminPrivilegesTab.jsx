import React from 'react'
import { Box, Grid, Typography, Stack, Alert, Button, useMediaQuery } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next'
import { Formik, Form } from 'formik';
import { parse, isDate } from "date-fns";
import InputField from '../multiStepForm/InputField';
import Base64InputField from '../multiStepForm/Base64InputField';
import DropdownInputField from '../multiStepForm/DropdownInputField';
import DateInputField from '../multiStepForm/DateInputField';
import { updateUser } from '../../store/actions/userActions';

import { useTheme } from '@mui/material/styles';

import countries from '../../assets/data/countries.json'

import AnimateButton from '../extended/AnimateButton';

import { useDispatch, useSelector } from 'react-redux';

const AdminPrivilegesTab = () => {
    return (
        <>
            <h1>Hello</h1>
        </>
    )
}

export default AdminPrivilegesTab