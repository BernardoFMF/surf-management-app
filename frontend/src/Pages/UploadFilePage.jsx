import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { parse, isDate } from "date-fns";
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom';
import TranslationMenu from '../components/TranslationMenu'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

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
    Stack,
    CircularProgress,
    Button,
    Input
} from '@mui/material';

import AuthWrapper from './auth/AuthWrapper';
import AuthRegister from './auth/auth-form/AuthRegister'
import AuthCardWrapper from './auth/AuthCardWrapper'
import Logo from '../components/Logo'
import { useParams } from 'react-router-dom'
import { getMemberValidation } from '../store/actions/companyActions';
import {uploadFile} from '../store/actions/uploadActions'
import MainCard from '../components/cards/MainCard';
import AnimateButton from '../components/extended/AnimateButton'
import LoadingButton from '@mui/lab/LoadingButton'
import InputField from '../components/multiStepForm/InputField';
import FileInputField from '../components/multiStepForm/FileInputField';

const UploadFilePage = () => {

    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()

    const handleSubmit = (values) => {
      console.log("ganda fixe");
      const formData = new FormData()
      formData.append("file", values.file)
      dispatch(uploadFile(formData))
    }

    const uploadFileFetch = useSelector((state) => state.uploadFileFetch)
    const { uploadGet } = uploadFileFetch

    return (
        <>
        <MainCard title={t('Upload csv File')} sx={{height: '100%'}}>
            <Formik
            initialValues={{ file: null }}
            onSubmit={handleSubmit} 
            validationSchema={Yup.object().shape({
              file: Yup.mixed(),
            })}
            >
            {formik => (
                <Form>
                <FileInputField name = 'file' label = 'file'/>
                <AnimateButton>
                <LoadingButton
                    disableElevation
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    {t('upload')}
                </LoadingButton>
                </AnimateButton>
                </Form>
            )}
        </Formik>
        </MainCard>
        </>)
}

export default UploadFilePage


















