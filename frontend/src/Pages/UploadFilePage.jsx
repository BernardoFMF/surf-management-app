import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { parse, isDate } from "date-fns";
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom';
import TranslationMenu from '../components/TranslationMenu'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
import User_Company_example from '../assets/data/User_CompanyExample.xlsx'
import quotas_example from '../assets/data/QuotaExample.xlsx'
import member_types_example from '../assets/data/TypesExample.xlsx'
import sports_example from '../assets/data/sportsExample.xlsx'
//import member_sports_example from '../assets/data/MemberSportsExample.xlsx'
import sportsTypes_example from '../assets/data/SportTypesExample.xlsx'

const UploadFilePage = () => {

    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    const handleSubmit = (values,type) => {
        console.log("chegou")
        console.log(type);
        const formData = new FormData()
        formData.append("file", values.file)
        dispatch(uploadFile(formData))
    }

    const onUser_CompanyDownload = () => {
        const link = document.createElement("a");
        link.download = `User_CompanyExample.xlsx`;
        link.href = User_Company_example
        link.click();
    }

    const onQuotaDownload = () => {
        const link = document.createElement("a");
        link.download = `QuotaExample.csv`;
        link.href = quotas_example
        link.click();
    }

    const onMemberTypeDownload = () => {
        const link = document.createElement("a");
        link.download = `MemberTypeExample.csv`;
        link.href = member_types_example
        link.click();
    }

    const onSportDownload = () => {
        const link = document.createElement("a");
        link.download = `SportExample.csv`;
        link.href = sports_example
        link.click();
    }

    const onMemberSportDownload = () => {
        const link = document.createElement("a");
        link.download = `MemberSportExample.csv`;
        //link.href = member_sports_example
        link.click();
    }

    const onSportTypesDownload = () => {
        const link = document.createElement("a");
        link.download = `SportTypesExample.csv`;
        link.href = sportsTypes_example
        link.click();
    }

    const uploadFileFetch = useSelector((state) => state.uploadFileFetch)
    const { uploadGet } = uploadFileFetch

    return (
        <>
        <MainCard title={t('Upload csv File')} sx={{height: '100%'}}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                General settings
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Instructions on how to do it</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
            To import your data from the csv files to the application database, will be needed 5 different csv files
            </Typography>
            <Typography>
            <strong>IMPORTANT:</strong> All the users will have a password equal to their username, remember them to change it the quickest that they can
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
            >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>Member Types</Typography>
            <Typography sx={{ color: 'text.secondary' }}>
            Define the different member types
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
            Dowload the following example ,remove the dummy data and fill it with your data and upload it as a csv file
            </Typography>
            <Button onClick={onMemberTypeDownload} variant="contained" color="success">
                Member Types example
            </Button>
            <Formik
            initialValues={{ file: null }}
            onSubmit={(values) => handleSubmit(values,'memberTypes')} 
            validationSchema={Yup.object().shape({
              file: Yup.mixed(),
            })}
            >
            {formik => (
                <Box mt={2} textAlign="left" width={'fit-content'}>
                <Form>
                <FileInputField name = 'MemberTypes File' label = 'file'/>
                <br></br>
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
                </Box>
            )}
        </Formik>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
            >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>Users and Companies</Typography>
            <Typography sx={{ color: 'text.secondary' }}>
            Upload all of the users/companies
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
            Dowload the following example ,remove the dummy data and fill it with your data and upload it as a csv file
            </Typography>
            <Button onClick={onUser_CompanyDownload} variant="contained" color="success">
                User/Company example
            </Button>
            <Formik
            initialValues={{ file: null }}
            onSubmit={(values) => handleSubmit(values,'usersCompanies')} 
            validationSchema={Yup.object().shape({
              file: Yup.mixed(),
            })}
            >
            {formik => (
                <Box mt={2} textAlign="left" width={'fit-content'}>
                <Form>
                <FileInputField name = 'Users/Companies File' label = 'file'/>
                <br></br>
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
                </Box>
            )}
        </Formik>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
            >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>Quotas</Typography>
            <Typography sx={{ color: 'text.secondary' }}>
            Upload all of the previous quotas
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
            Dowload the following example ,remove the dummy data and fill it with your data and upload it as a csv file
            </Typography>
            <Button onClick={onQuotaDownload} variant="contained" color="success">
                Quotas example
            </Button>
            <Formik
            initialValues={{ file: null }}
            onSubmit={(values) => handleSubmit(values,'quotas')} 
            validationSchema={Yup.object().shape({
              file: Yup.mixed(),
            })}
            >
            {formik => (
                <Form>
                    <Box mt={2} textAlign="left" width={'fit-content'}>
                        <FileInputField position= "fixed" name = 'Quotas File' label = 'file'/>
                        <br></br>
                        <AnimateButton>
                        <Button
                            disableElevation
                            size="large"
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            {t('upload')}
                        </Button>
                        </AnimateButton>
                        </Box>
                </Form>
            )}
        </Formik>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5bh-content"
            id="panel5bh-header"
            >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>Sports</Typography>
            <Typography>
                Define all the sports that exists in the club
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                Dowload the following example ,remove the dummy data and fill it with your data and upload it as a csv file
            </Typography>
            <Button onClick={onSportDownload} variant="contained" color="success">
                Sports example
            </Button>
            <Formik
            initialValues={{ file: null }}
            onSubmit={(values) => handleSubmit(values,'sports')} 
            validationSchema={Yup.object().shape({
              file: Yup.mixed(),
            })}
            >
            {formik => (
                <Box mt={2} textAlign="left" width={'fit-content'}>
                <Form>
                <FileInputField name = 'Sports File' label = 'file'/>
                <br></br>
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
                </Box>
            )}
        </Formik>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6bh-content"
            id="panel6bh-header"
            >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>SportsTypes</Typography>
            <Typography>
            Define the various types on sports
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                Dowload the following example ,remove the dummy data and fill it with your data and upload it as a csv file
            </Typography>
            <Button onClick={onSportTypesDownload} variant="contained" color="success">
                SportTypes example
            </Button>
            <Formik
            initialValues={{ file: null }}
            onSubmit={(values) => handleSubmit(values,'sportTypes')} 
            validationSchema={Yup.object().shape({
              file: Yup.mixed(),
            })}
            >
            {formik => (
                <Box mt={2} textAlign="left" width={'fit-content'}>
                <Form>
                <FileInputField name = 'Member Types File' label = 'file'/>
                <br></br>
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
                </Box>
            )}
        </Formik>
            </AccordionDetails>
        </Accordion>
        </MainCard>

</>)
}

export default UploadFilePage


















