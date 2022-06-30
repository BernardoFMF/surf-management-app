import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '@mui/material/styles';
import {
    Drawer,
    Fab,
    Grid,
    IconButton,
    Tooltip,
    Typography,
    Box,
    Alert
} from '@mui/material';
import { Formik, Form } from 'formik';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { gridSpacing } from '../../store/constants/themeConstants'
import MessageIcon from '@mui/icons-material/Message';
import InputField from '../../components/multiStepForm/InputField';
import { useTranslation } from 'react-i18next'
import AnimateButton from '../../components/extended/AnimateButton';
import LoadingButton from '@mui/lab/LoadingButton';
import {sendEmailContact} from '../../store/actions/emailActions'

const ContactFloatMenu = () => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const theme = useTheme();

    const sendEmail = useSelector((state) => state.sendEmail)
    const { loading, error, result } = sendEmail

    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen(!open);
    };

    const emailHandler = (values) => {
        dispatch(sendEmailContact(values))
    }

    return (
        <>
            <Tooltip title={t("front_page_contact_us")}>
                <Fab
                    component="div"
                    onClick={(e) => handleToggle()}
                    size="medium"
                    variant="string"
                    color="secondary"
                    sx={{
                        bottom: 0,
                        m: 4,
                        position: 'fixed',
                        right: 20,
                        zIndex: (theme) => theme.zIndex.speedDial,
                        boxShadow: theme.shadows[8]
                    }}
                >
                    <IconButton color="inherit" size="large" disableRipple>
                        <MessageIcon />
                    </IconButton>
                </Fab>
            </Tooltip>

            <Drawer
                anchor="right"
                onClose={(e) => handleToggle()}
                open={open}
                PaperProps={{
                    sx: {
                        width: 280
                    }
                }}
            >
                <PerfectScrollbar component="div">
                    <Formik
                        initialValues={{
                            from_email: '',
                            from_name: '',
                            topic: '',
                            text: ''
                        }}
                        enableReinitialize={true}
                        onSubmit={emailHandler}
                    >
                        {formik => (
                            <Form>
                                <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
                                    <Grid item xs={12}>
                                        <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                            {t('front_page_contact_us')}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        { result && <Box><Alert severity="success">{t('email_sent')}</Alert></Box> }
                                        { error && <Box><Alert severity="error">{t(error)}</Alert></Box> }
                                    </Grid>
                                    <Grid item xs={12}>
                                        <InputField name='from_email' label={'Email'} type='text' />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <InputField name='from_name' label={t('name')} type='text' />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <InputField name='topic' label={t('topic')} type='text' />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <InputField name='text' type='text' multiline={true} rows={8} />
                                    </Grid>
                                    <Grid item>
                                        <AnimateButton>
                                            <LoadingButton
                                                disableElevation
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                loading = {loading}
                                            >
                                                {t('send')}
                                            </LoadingButton>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </PerfectScrollbar>
            </Drawer>
        </>
    );
};

export default ContactFloatMenu