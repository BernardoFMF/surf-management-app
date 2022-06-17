import React, { useState, useEffect } from 'react'
import default_video from './../../../src/assets/data/aboutPageVideo.mp4'
import './../../../src/assets/scss/homePage.scss'
import {
    Typography,
    useMediaQuery,
} from '@mui/material'
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next'
import AnimatedVideo from '../AnimatedVideo'
import AnimatedPage from '../AnimatedText'

const About = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const {t, i18n} = useTranslation()
/*<AnimatedVideo>
          <video
          id = 'homeVideo'
          autoPlay
          muted
          loop
          >
          <source src = {default_video} type = "video/mp4" />
          </video>
        </AnimatedVideo>*/
    return (
        <>    
        
        <AnimatedPage>
          <Box  sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginTop: { xs: 25, md: 30, lg:30},
                      flexDirection: 'column',
                      m: 'auto',
                      width: { xs: 250, sm: 600, md: 1200},
                      }}>
            <Typography sx={{ fontSize: { xs: '2.5em', md: '5em'}, fontWeight: 700, color: 'white' }}>
              {t('who_are_we')}
            </Typography>
            <Typography sx={{ fontSize: { xs: '1.5em', md: '1.5em'}, color: 'white', marginTop: 2, marginBottom: 2 }}>
              {t('about_text_1')}
            </Typography>
            <Typography sx={{ fontSize: { xs: '1.5em', md: '1.5em'}, color: 'white', marginTop: 0, marginBottom: 2 }}>
              {t('about_text_2')}
            </Typography>
            <Typography sx={{ fontSize: { xs: '1.5em', md: '1.5em'}, color: 'white', marginTop: 0, marginBottom: 2 }}>
              {t('about_text_3')}
            </Typography>
          </Box>
        </AnimatedPage>
    </>
)}

export default About