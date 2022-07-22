import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { parse, isDate } from "date-fns";
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom';
import TranslationMenu from '../components/TranslationMenu'
import default_image from '../assets/data/blank-profile-picture.png'

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

    const label = t('sign_up_image')
    const size = 250

    const dispatch = useDispatch()

    const validateFetch = useSelector((state) => state.validateFetch)
    const { loading, error, validateGet } = validateFetch

    useEffect(() => {
        dispatch(getMemberValidation(id))
        return () => {
            dispatch({ type: MEMBER_VALIDATION_FETCH_RESET })
        }
    },[])

    return (
        <>
            <Meta title={t('validate_page_title')}/>
            <AuthWrapper>
                <AnimatedCard>
                    <TranslationMenu sx={{ pt: 2}}></TranslationMenu>                    
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
                </AnimatedCard>
            </AuthWrapper>
        </>
    )
}

export default ValidatePage


















