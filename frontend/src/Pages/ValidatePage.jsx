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

import * as Yup from 'yup';
import AuthWrapper from '../Pages/auth/AuthWrapper';
import AuthRegister from '../Pages/auth/auth-form/AuthRegister'
import AuthCardWrapper from '../Pages/auth/AuthCardWrapper'
import Logo from '../components/Logo'
import { useParams } from 'react-router-dom'
import { getMemberValidation } from '../store/actions/companyActions';
import AvatarBase64 from '../components/AvatarBase64'

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
    },[])

    return (
        <>
        <AuthWrapper>
            <TranslationMenu sx={{ pt: 2}}></TranslationMenu>                    
            { loading ? <Stack alignItems="center">
                    <CircularProgress size='4rem'/>
                    </Stack> 
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
                                    
                                    <Grid item xs={12}>
                                    <Grid item xs={12}>
                <Grid
                    container
                    direction={matchDownSM ? 'column-reverse' : 'row'}
                    alignItems="center"
                    justifyContent="center"
                >

                    <Grid item>
                        { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> }
                        <Stack alignItems="center" justifyContent="center" spacing={1}>  
                            {validateGet ?
                                <>
                    
                                <Box mt={2} ml={{md: 2, lg: 2}} display="flex" >
                                    <Avatar
                                        alt='profile-picture.png'
                                        src={validateGet.img_value_}
                                        sx={{ width: size, height: size}}
                                    />  
                                </Box></> 
                                :
                                <Box mt={2} ml={2} display="flex" >
                                    <Avatar
                                        alt='blank-profile-picture.png'
                                        src= {default_image} 
                                        sx={{ width: size, height: size}}
                                    />
                                </Box>
                            }
                            <Grid item xs={12}/>
                            <Grid item xs={12}/>
                            <Typography
                                color={theme.palette.primary.main}
                                gutterBottom
                                variant={matchDownSM ? 'h3' : 'h2'}
                            >
                                { `${validateGet ? validateGet.full_name_: ""}`}
                            </Typography>
                        </Stack>
                    </Grid>
                    </Grid>
            </Grid>
            <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">{`${validateGet ? (validateGet.has_debt_ ? t("validate_member_not_discounts"): t("validate_member_discounts")) : ""}`}</Typography>
                    </Box>
                </Grid>
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            }
        </AuthWrapper>
        </>)
}

export default ValidatePage


















