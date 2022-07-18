import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { exportMembersCSV } from '../store/actions/exportActions'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
    Box,
    Grid,
    Typography,
    Alert,
    Button
} from '@mui/material';

import {uploadFile} from '../store/actions/uploadActions'
import MainCard from '../components/cards/MainCard';
import AnimateButton from '../components/extended/AnimateButton'
import LoadingButton from '@mui/lab/LoadingButton'
import Meta from '../components/Meta';
import FileInputField from '../components/multiStepForm/FileInputField';
import User_Company_example from '../assets/data/User_CompanyExample.xlsx'
import quotas_example from '../assets/data/QuotaExample.xlsx'
import member_types_example from '../assets/data/TypesExample.xlsx'
import sports_example from '../assets/data/sportsExample.xlsx'
import member_sports_example from '../assets/data/MemberSportsExample.xlsx'
import sportsTypes_example from '../assets/data/SportTypesExample.xlsx'
import { UPLOAD_RESET } from '../store/constants/uploadConstants'
import ExportCSV from '../components/ExportCSV'

const UploadFilePage = () => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const exportM = useSelector((state) => state.exportMembersCSV)
    const { exportMembers } = exportM
    const [data, setData] = useState([]);
    const [newMembers, setnewMembers] = useState(false);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        return () => {
            dispatch({ type: UPLOAD_RESET })
        }
    },[])

    useEffect(() => {
        dispatch(exportMembersCSV())
    },[newMembers])

    useEffect(() => {
        if(exportMembers) {
            setData(exportMembers)
        }
    },[exportMembers])

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false)
      dispatch({ type: UPLOAD_RESET })
    };

    const handleSubmit = (values,type) => {
        const formData = new FormData()
        formData.append("file", values.file)
        formData.append("type",type)
        dispatch(uploadFile(formData))
        if(type==="usersCompanies")setnewMembers(true)
    }

    const onUser_CompanyDownload = () => {
        const link = document.createElement("a")
        link.download = `User_CompanyExample.xlsx`
        link.href = User_Company_example
        link.click();
    }

    const onQuotaDownload = () => {
        const link = document.createElement("a");
        link.download = `QuotaExample.xlsx`
        link.href = quotas_example
        link.click();
    }

    const onMemberTypeDownload = () => {
        const link = document.createElement("a")
        link.download = `MemberTypeExample.xlsx`
        link.href = member_types_example
        link.click();
    }

    const onSportDownload = () => {
        const link = document.createElement("a")
        link.download = `SportExample.xlsx`
        link.href = sports_example
        link.click();
    }

    const onMemberSportDownload = () => {
        const link = document.createElement("a")
        link.download = `MemberSportExample.xlsx`
        link.href = member_sports_example
        link.click();
    }

    const onSportTypesDownload = () => {
        const link = document.createElement("a")
        link.download = `SportTypesExample.xlsx`
        link.href = sportsTypes_example
        link.click();
    }

    const uploadFileFetch = useSelector((state) => state.uploadFileFetch)
    const { uploadGet,loading,error } = uploadFileFetch

    const headers = [
        { key: 'id_', label: 'ID'},
        { key: 'email_', label: 'Email'},
        { key: 'iban_', label: 'IBAN'},   
        { key: 'member_type_', label: t('member_type')},
        { key: 'phone_number_', label: t('phone_number')},
    ];

    const csvreport = {
        data: data,
        headers: headers,
        filename: 'club_members.csv'
    };


    return (
        <>
        <Meta title={t('upload_file_page_title')}/>
        <MainCard title={t('Upload csv File')} sx={{height: '100%'}}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                {t("general_settings")}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>{t("instructions")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
            {t("instructions_1")}
            </Typography>
            <Typography>
            <strong>{t("important")}:</strong> {t("instructions_2")}
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
            >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>{t("member_types")}</Typography>
            <Typography sx={{ color: 'text.secondary' }}>
            {t("instructions_3")}
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
            {t("instructions_4")}
            </Typography>
            { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> }
            { uploadGet && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="success">{t('uploaded_sucessfully')}</Alert></Box> }
            <Button  sx={{mt: 2 }} onClick={onMemberTypeDownload} variant="contained" color="success">
                {t("member_types_example")}
            </Button>
            <Formik
            initialValues={{ file: null }}
            onSubmit={(values) => handleSubmit(values,'memberTypes')} 
            validationSchema={Yup.object().shape({
                file: Yup.mixed().required("file needed"),
            })}
            >
            {formik => (
                <Box mt={2} textAlign="left" width={'fit-content'}>
                <Form>
                <FileInputField name = 'file' label = 'MemberTypes File'/>
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
            <Typography sx={{ width: '33%', flexShrink: 0 }}>{t("users_and_companies")}</Typography>
            <Typography sx={{ color: 'text.secondary' }}>
            {t("upload_user_and_companies")}
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
            {t("instructions_4")}
            </Typography>
            { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> }
            { uploadGet && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="success">{t('uploaded_sucessfully')}</Alert></Box> }
            <Button sx={{mt: 2 }} onClick={onUser_CompanyDownload} variant="contained" color="success">
                {t("user_and_companies_example")}
            </Button>
            <Formik
            initialValues={{ file: null }}
            onSubmit={(values) => {handleSubmit(values,'usersCompanies')}} 
            validationSchema={Yup.object().shape({
                file: Yup.mixed().required("file needed"),
            })}
            >
            {formik => (
                <Box mt={2} textAlign="left" width={'fit-content'}>
                <Form>
                <FileInputField name = 'file' label = 'Users/Companies File'/>
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
        <Accordion expanded={expanded === 'panel3.5'} onChange={handleChange('panel3.5')}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3.5bh-content"
            id="panel3.5bh-header"
            >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                {t("check_ids")}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>{t("instructions_5")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
            {t("instructions_5")}
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
            <Grid rowSpacing={4} columnSpacing={0} container direction={'row'} sx={{ mt: 2 }} >
                <Grid item>
                    <ExportCSV csvreport={csvreport} exportText={t('export_members')} ></ExportCSV>
                </Grid>
            </Grid>
            </Box>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
            >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>{t("quotas")}</Typography>
            <Typography sx={{ color: 'text.secondary' }}>
            {t("upload_quotas")}
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
            {t("instructions_4")}
            </Typography>
            { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> }
            { uploadGet && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="success">{t('uploaded_sucessfully')}</Alert></Box> }
            <Button  sx={{mt: 2 }} onClick={onQuotaDownload} variant="contained" color="success">
                {t("quotas_example")}
            </Button>
            <Formik
            initialValues={{ file: null }}
            onSubmit={(values) => handleSubmit(values,'quotas')} 
            validationSchema={Yup.object().shape({
                file: Yup.mixed().required("file needed"),
            })}
            >
            {formik => (
                <Form>
                    <Box mt={2} textAlign="left" width={'fit-content'}>
                        <FileInputField name = 'file' label = 'Quotas File'/>
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
            <Typography sx={{ width: '33%', flexShrink: 0 }}>{t("sports")}</Typography>
            <Typography sx={{ color: 'text.secondary' }}>
            {t("instructions_7")}
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
            {t("instructions_4")}
            </Typography>
            { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> }
            { uploadGet && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="success">{t('uploaded_sucessfully')}</Alert></Box> }
            <Button  sx={{mt: 2 }} onClick={onSportDownload} variant="contained" color="success">
                {t("sports_example")}
            </Button>
            <Formik
            initialValues={{ file: null }}
            onSubmit={(values) => handleSubmit(values,'sports')} 
            validationSchema={Yup.object().shape({
                file: Yup.mixed().required("file needed"),
            })}
            >
            {formik => (
                <Box mt={2} textAlign="left" width={'fit-content'}>
                <Form>
                <FileInputField name = 'file' label = 'Sports File'/>
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
            <Typography sx={{ width: '33%', flexShrink: 0 }}>{t("sport_types")}</Typography>
            <Typography sx={{ color: 'text.secondary' }}>
            {t("instructions_8")}
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                {t("instructions_4")}
            </Typography>
            { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> }
            { uploadGet && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="success">{t('uploaded_sucessfully')}</Alert></Box> }
            <Button  sx={{mt: 2 }} onClick={onSportTypesDownload} variant="contained" color="success">
                {t("sport_types_example")}
            </Button>
            <Formik
            initialValues={{ file: null }}
            onSubmit={(values) => handleSubmit(values,'sportTypes')} 
            validationSchema={Yup.object().shape({
                file: Yup.mixed().required("file needed"),
            })}
            >
            {formik => (
                <Box mt={2} textAlign="left4" width={'fit-content'}>
                <Form>
                <FileInputField name = 'file' label = 'Sport Types File'/>
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
        <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel7bh-content"
            id="panel7bh-header"
            >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>{t("user_sports")}</Typography>
            <Typography sx={{ color: 'text.secondary' }}>
                {t("upload_user_sports")}
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                {t("instructions_4")}   
            </Typography>
            { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> }
            { uploadGet && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="success">{t('uploaded_sucessfully')}</Alert></Box> }
            <Button  sx={{mt: 2 }} onClick={onMemberSportDownload} variant="contained" color="success">
                {t("user_sports_example")}
            </Button>
            <Formik
            initialValues={{ file: null }}
            onSubmit={(values) => handleSubmit(values,'memberSports')} 
            validationSchema={Yup.object().shape({
                file: Yup.mixed().required("file needed"),
            })}
            >
            {formik => (
                <Box mt={2} textAlign="left" width={'fit-content'}>
                <Form>
                <FileInputField name = 'file' label = 'Member Sports File'/>
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


















