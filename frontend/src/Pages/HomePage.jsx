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
    Link,
    Divider
} from '@mui/material'
import AnimateButton from '../components/extended/AnimateButton'
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Home from '../components/home/Home'
import About from '../components/home/About'
import AnimatedPage from '../components/AnimatedText'

const HomePage = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [page, setPage] = useState(0);

  const changePage = (index) => {
    setPage(index)
  }

  useEffect(()=> {
    console.log(page);
  },[page])

  const {t, i18n} = useTranslation()

  return (
    <>
        <HomeHeader index={page} changePage={changePage}></HomeHeader>
        {page === 0 ? <Home/> : page === 1 ? <About/> : ""}  
    </>
  )
}

export default HomePage
