import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import default_video from './../../src/assets/data/homePageVideo.mp4'
import './../../src/assets/scss/homePage.scss'
import HomeHeader from '../layout/homeHeader'
import {
    Box,
    Typography,
    Grid,
    useMediaQuery,
    Button,
    Link
} from '@mui/material'
import AnimateButton from '../components/extended/AnimateButton'
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next'

const HomePage = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  const {t, i18n} = useTranslation()

  return (
    <>
        <HomeHeader></HomeHeader>
        <video
        id = 'homeVideo'
        autoPlay
        muted
        loop
        >
        <source src = {default_video} type = "video/mp4" />
        </video>
        <Box sx={{ marginLeft: { xs: 4, md: 25}, marginTop: { xs: 25, md: 30}, flexGrow: 1, display: 'absolute', width: { xs: 200, md: 500}}}>
              <Typography sx={{ fontSize: { xs: '2.5em', md: '4em'}, fontWeight: 700, color: 'white' }}>
                {t('front_page_welcome')}
              </Typography>
              <Typography sx={{ fontSize: { xs: '1em', md: '1.5em'}, color: 'white', marginTop: 2, marginBottom: 2 }}>
                {t('front_page_sign_suggestion')}
              </Typography>
              <Grid container spacing={matchDownSM ? 0 : 2} sx={{ width: { xs: 200, md: 400}}}>
                    <Grid item xs={12} sm={6} style={{marginTop: '10px'}}>
                        <Link href='/sign-up'>
                            <AnimateButton>
                                <Button 
                                  disableElevation
                                  fullWidth
                                  size="normal"
                                  type="button"
                                  variant="contained"
                                  color="primary"
                                  >
                                  {t('front_page_signup')}
                                  </Button>
                            </AnimateButton>
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{marginTop: '10px'}}>
                        <Link href='/sign-in'>
                          <AnimateButton>
                              <Button
                              disableElevation
                              fullWidth
                              size="normal"
                              type="submit"
                              variant="contained"
                              color='primary'
                              >
                                {t('front_page_login')}
                              </Button>
                          </AnimateButton>
                        </Link>
                    </Grid>
                </Grid>
        </Box>
    </>
  )
}

export default HomePage
