import React from 'react'
import '../../assets/scss/forbidden.scss'
import Meta from '../../components/Meta'
import { useTheme } from '@mui/material/styles'
import { Grid, Button, Typography, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import AnimateButton from '../../components/extended/AnimateButton'
import LoadingButton from '@mui/lab/LoadingButton';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from 'react-router-dom'
import TranslationMenu from '../../components/TranslationMenu'
import AuthWrapper from '../auth/AuthWrapper'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AnimatedPage from '../../components/AnimatedPage'

const AnyError = ({code, message, extraMessage}) => {
    const theme = useTheme();
    const { t } = useTranslation()
    const navigate = useNavigate();
    return (
      <>
        <Meta title={code ? code + ' - ' + message : message}/>
        {/* logo & toggler button */}
        <AuthWrapper>
            <TranslationMenu sx={{ pt: 2}}></TranslationMenu>
            <AnimatedPage>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh', mt: { md: -20 }}}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <Stack alignItems="center">
                                <Typography sx={{fontSize: '12rem', fontWeight: 500}} color={theme.palette.primary.main}>
                                    Oops!
                                </Typography>
                                <Typography mb={2} sx={{fontSize: '1.6rem', fontWeight: 500}}>
                                    {`${code ? code : ''} ${code ? '-' : ''} ${message}`}
                                </Typography>
                                {extraMessage && 
                                    <Typography mb={2} sx={{fontSize: '1.1rem', fontWeight: 500}}>
                                        {extraMessage}
                                        <a href="mailto:ericeirasurfclub@outlook.com">ericeirasurfclub@outlook.com</a>
                                    </Typography>
                                }
                                <Stack direction={'row'} spacing={2} alignItems="center">
                                    <AnimateButton >
                                        <Link to={'/'} style={{textDecoration:"none"}}>
                                            <LoadingButton
                                                disableElevation
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                startIcon={<HomeIcon></HomeIcon>}
                                            >
                                                {t('go home')}
                                            </LoadingButton>
                                        </Link>
                                    </AnimateButton>
                                        <Button onClick={() => navigate(-1)}>
                                            <LoadingButton
                                                disableElevation
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                startIcon={<ArrowBackIcon></ArrowBackIcon>}
                                            >
                                                {t('go back')}
                                            </LoadingButton>
                                        </Button>
                                </Stack>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            </AnimatedPage> 
        </AuthWrapper>    
      </>
        
  )
}

export default AnyError