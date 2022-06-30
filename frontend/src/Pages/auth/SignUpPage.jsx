import { useTranslation } from 'react-i18next'
import TranslationMenu from '../../components/TranslationMenu'
import React, { useState, useEffect } from 'react'


// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper from './AuthWrapper'
import AuthCardWrapper from './AuthCardWrapper'
import Logo from '../../components/Logo'
import AuthRegister from './auth-form/AuthRegister'
import AnimatedCard from '../../components/AnimatedCard';
import Box from '@mui/material/Box';
import ClockLoader from 'react-spinners/ClockLoader'
import Meta from '../../components/Meta';
// assets

const SignUp = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const {t, i18n} = useTranslation()
    const [loading, setLoading] = useState(false)

    useEffect(()=> {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    },[])

    return (
        <>
            <Meta title={t('signup_page_title')}/>
            <AuthWrapper>
                <AnimatedCard>
                <TranslationMenu sx={{ pt: 2}}></TranslationMenu>
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
                                                <AuthRegister />
                                            </Grid>
                                        </Grid>
                                    </AuthCardWrapper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid> 
                </AnimatedCard>
            </AuthWrapper>
        </>
        
    );
};

export default SignUp