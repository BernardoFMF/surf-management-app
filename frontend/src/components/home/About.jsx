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

const About = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const {t, i18n} = useTranslation()

    return (
        <>    
        <video
        id = 'homeVideo'
        autoPlay
        muted
        loop
        >
        <source src = {default_video} type = "video/mp4" />
        </video>
        <Box sx={{ justifyContent:'center', marginLeft: { xs: 4, md: 120}, marginTop: { xs: 25, md: 30}, marginRight: { xs: 0, md: 200},flexGrow: 1, display: 'absolute', width: { xs: 250, md: 800}}}>
          <Typography sx={{ fontSize: { xs: '2.5em', md: '4em'}, fontWeight: 700, color: 'white' }}>
            {t('who_are_we')}
          </Typography>
          <Typography sx={{ fontSize: { xs: '1.5em', md: '1.2em'}, color: 'white', marginTop: 2, marginBottom: 2 }}>
            {t('about_text_1')}
          </Typography>
          <Typography sx={{ fontSize: { xs: '1.5em', md: '1.2em'}, color: 'white', marginTop: 0, marginBottom: 2 }}>
            {t('about_text_2')}
          </Typography>
        </Box>
    </>
)}

export default About