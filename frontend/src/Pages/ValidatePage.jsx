import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next'
import TranslationMenu from '../components/TranslationMenu'
import { Formik, Form } from 'formik';
import InputField from '../components/multiStepForm/InputField';
import * as Yup from 'yup';
import AnimateButton from '../components/extended/AnimateButton';
import LoadingButton from '@mui/lab/LoadingButton';

import { useTheme } from '@mui/material/styles';
import {
    Box,
    Grid,
    Typography,
    useMediaQuery,
    Alert,
    Stack,
    CircularProgress,
    Avatar
} from '@mui/material';


import AuthWrapper from '../Pages/auth/AuthWrapper';
import AnimatedCard from '../components/AnimatedCard';
import AuthCardWrapper from '../Pages/auth/AuthCardWrapper'
import Logo from '../components/Logo'
import { useParams } from 'react-router-dom'
import { getMemberValidation } from '../store/actions/companyActions';
import Meta from '../components/Meta';
import { MEMBER_VALIDATION_FETCH_RESET } from '../store/constants/companyConstants';

const ValidatePage = () => {

    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const {t, i18n} = useTranslation()

    let { id } = useParams()

    const size = 250

    const dispatch = useDispatch()

    const [ submitted, setSubmitted ] = useState(false)

    const validateFetch = useSelector((state) => state.validateFetch)
    const { loading, error, validateGet } = validateFetch

    useEffect(() => {
        //dispatch(getMemberValidation(id))
        return () => {
            dispatch({ type: MEMBER_VALIDATION_FETCH_RESET })
        }
    },[])

    useEffect(() => {
        if (validateGet) {
            console.log(validateGet);
            setSubmitted(true)
        }
    }, [validateGet])

    const handleSubmit = (values) => {
        let pin = values.first + values.second + values.third + values.fourth
        dispatch(getMemberValidation(id, pin))
    }

    /*
    { loading ? <Stack alignItems="center"><CircularProgress size='4rem'/></Stack> 
                        :
                    <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh', mt: { md: -7 }}}>
                        <Grid item xs={12}>
                            <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                                <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                                    <AuthCardWrapper>
                                        <Grid container spacing={2} alignItems="center" justifyContent="center">
                                            <Grid item sx={{ mb: 3 }} alignSelf justifyContent="center" >
                                                <Logo variant='blue' path='/' sx={{width: 150}}/>
                                            </Grid>
                                            <Grid
                                                container
                                                direction={matchDownSM ? 'column-reverse' : 'row'}
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Grid item>
                                                    { error && <Alert severity="error">{t(error)}</Alert> }
                                                    
                                                    { validateGet && 
                                                        (
                                                            <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                                <Box mt={2}  display="flex" >
                                                                    <Avatar
                                                                        alt='profile-picture.png'
                                                                        src={validateGet.img_value_}
                                                                        sx={{ width: size, height: size}}
                                                                    />  
                                                                </Box> 
                                                                <Typography
                                                                    color={theme.palette.primary.main}
                                                                    gutterBottom
                                                                    variant={matchDownSM ? 'h3' : 'h2'}
                                                                >
                                                                    {validateGet.full_name_}
                                                                </Typography>
                                                                <Typography variant="subtitle1">{validateGet.has_debt_ ? t("validate_member_not_discounts"): t("validate_member_discounts")}</Typography>
                                                            </Stack>  
                                                        )
                                                    }
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </AuthCardWrapper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    }
    */

    const focusChange = (e) => {
        if (e.target.value.length == e.target.getAttribute("maxlength")) {
            console.log("focus");
            if (e.target.name == 'first') pinInputSecond.current.focus()
            else if (e.target.name == 'second') pinInputThird.current.focus()
            else if (e.target.name == 'third') pinInputFourth.current.focus()
        }
    }

    const pinInputFirst = useRef(null);
    const pinInputSecond = useRef(null);
    const pinInputThird = useRef(null);
    const pinInputFourth = useRef(null);

    return (
        <>
            <Meta title={t('validate_page_title')}/>
            <AuthWrapper>
                <AnimatedCard>
                    <TranslationMenu sx={{ pt: 2}}></TranslationMenu>                    
                    {
                        submitted == false ? (
                            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh', mt: { md: -7 }}}>
                                <Grid item xs={12}>
                                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                                            <AuthCardWrapper>
                                                { error && <Alert severity="error">{t(error)}</Alert> }
                                                <Formik
                                                    initialValues={{
                                                        first: "",
                                                        second: "",
                                                        third: "",
                                                        fourth: ""
                                                    }}
                                                    validationSchema={Yup.object().shape({
                                                        first: Yup.string().required(t('pin_mandatory')),
                                                        second: Yup.string().required(t('pin_mandatory')),
                                                        third: Yup.string().required(t('pin_mandatory')),
                                                        fourth: Yup.string().required(t('pin_mandatory'))
                                                    })}
                                                    onSubmit={handleSubmit}
                                                >
                                                    {formik => (
                                                        <Form>
                                                            <Stack direction="column" justifyContent='center' spacing={1}>
                                                                <Box sx={{ pt: 2, pl: 2, pr: 2, width: { md: 400 }}}>
                                                                    <Stack direction="row" spacing={2} alignItems='center'>
                                                                        <InputField name='first' type='text' inputProps={{ maxLength: 1 }} onInput={e => focusChange(e)} inputRef={pinInputFirst}></InputField>
                                                                        <InputField name='second' type='text' inputProps={{ maxLength: 1 }} onInput={e => focusChange(e)} inputRef={pinInputSecond}></InputField>
                                                                        <InputField name='third' type='text' inputProps={{ maxLength: 1 }} onInput={e => focusChange(e)} inputRef={pinInputThird}></InputField>
                                                                        <InputField name='fourth' type='text' inputProps={{ maxLength: 1 }} onInput={e => focusChange(e)} inputRef={pinInputFourth}></InputField>
                                                                    </Stack>
                                                                    
                                                                </Box>
                                                                <AnimateButton>
                                                                    <LoadingButton
                                                                        disableElevation
                                                                        fullWidth
                                                                        size="normal"
                                                                        type="submit"
                                                                        variant="contained"
                                                                        color="primary"
                                                                        loading = {loading}
                                                                    >
                                                                        {t('sign_up_submit')}
                                                                    </LoadingButton>
                                                                </AnimateButton>
                                                            </Stack>
                                                        </Form>
                                                    )}
                                                </Formik>
                                            </AuthCardWrapper>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ) : (
                            <>
                                { loading ? 
                                    <Stack alignItems="center"><CircularProgress size='4rem'/></Stack>
                                    : (
                                        <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh', mt: { md: -7 }}}>
                                            <Grid item xs={12}>
                                                <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                                                    <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                                                        <AuthCardWrapper>
                                                            <Grid container spacing={2} alignItems="center" justifyContent="center">
                                                                <Grid item sx={{ mb: 3 }} alignSelf justifyContent="center" >
                                                                    <Logo variant='blue' path='/' sx={{width: 150}}/>
                                                                </Grid>
                                                                <Grid
                                                                    container
                                                                    direction={matchDownSM ? 'column-reverse' : 'row'}
                                                                    alignItems="center"
                                                                    justifyContent="center"
                                                                >
                                                                    <Grid item>
                                                                        { error && <Alert severity="error">{t(error)}</Alert> }
                                                                        { validateGet && 
                                                                            (
                                                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                                                    <Box mt={2}  display="flex" >
                                                                                        <Avatar
                                                                                            alt='profile-picture.png'
                                                                                            src={validateGet.img_value_}
                                                                                            sx={{ width: size, height: size}}
                                                                                        />  
                                                                                    </Box> 
                                                                                    <Typography
                                                                                        color={theme.palette.primary.main}
                                                                                        gutterBottom
                                                                                        variant={matchDownSM ? 'h3' : 'h2'}
                                                                                    >
                                                                                        {validateGet.full_name_}
                                                                                    </Typography>
                                                                                    <Typography variant="subtitle1">{validateGet.has_debt_ ? t("validate_member_not_discounts"): t("validate_member_discounts")}</Typography>
                                                                                </Stack>  
                                                                            )
                                                                        }
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </AuthCardWrapper>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    )
                                }
                            </>
                            
                        )
                    }
                </AnimatedCard>
            </AuthWrapper>
        </>
    )
}

export default ValidatePage


















