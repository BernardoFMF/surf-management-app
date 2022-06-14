import { useTranslation } from 'react-i18next'
import TranslationMenu from '../../components/TranslationMenu'


// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper from './AuthWrapper'
import AuthCardWrapper from './AuthCardWrapper'
import Logo from '../../components/Logo'
import AuthRegister from './auth-form/AuthRegister'

// assets

const SignUp = () => {
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
                                        <AuthRegister />
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

export default SignUp