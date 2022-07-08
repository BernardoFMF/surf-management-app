import { useTranslation } from 'react-i18next'
import TranslationMenu from '../../components/TranslationMenu'
import React from 'react'

// material-ui
import { useTheme } from '@mui/material/styles'
import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper from './AuthWrapper'
import AuthCardWrapper from './AuthCardWrapper'
import AuthChangeCredentials from './auth-form/AuthChangeCredentials';
import Logo from '../../components/Logo'
import AnimatedCard from '../../components/AnimatedCard';
import Meta from '../../components/Meta';

const ChangeCredentialsPage = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const { t } = useTranslation()
  
    return (
        <>
            <Meta title={t('change_credentials_page_title')}/>
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
                                                <Grid
                                                    container
                                                    direction={matchDownSM ? 'column-reverse' : 'row'}
                                                    alignItems="center"
                                                    justifyContent="center"
                                                >
                                                    <Grid item>
                                                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                            <Typography
                                                                color={theme.palette.primary.main}
                                                                gutterBottom
                                                                variant={matchDownSM ? 'h3' : 'h2'}
                                                            >
                                                                {t('change_credentials')}
                                                            </Typography>
                                                        </Stack>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <AuthChangeCredentials />
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

export default ChangeCredentialsPage