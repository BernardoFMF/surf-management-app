import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import TranslationMenu from '../../components/TranslationMenu'

// material-ui
import { useTheme } from '@mui/material/styles'
import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper from './AuthWrapper'
import AuthCardWrapper from './AuthCardWrapper'
import AuthLogin from './auth-form/AuthLogin'
import Logo from '../../components/Logo'
import AuthFooter from '../../components/cards/AuthFooter'

// assets

const SignInPage = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const {t, i18n} = useTranslation()

    return (
        <AuthWrapper>
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
                                                        {t('sign_in_welcome')}
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AuthLogin />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item container direction="column" alignItems="center" xs={12}>
                                            <Typography
                                                component={Link}
                                                to="/sign-up"
                                                variant="subtitle1"
                                                sx={{ textDecoration: 'none' }}
                                            >
                                                {t('sign_in_to_sign_up')}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </AuthWrapper>
    );
};

export default SignInPage