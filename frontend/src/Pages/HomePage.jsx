import React, { useState, useEffect } from 'react'
import './../../src/assets/scss/homePage.scss'
import HomeHeader from '../layout/homeHeader'
import {
    useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next'
import Home from '../components/home/Home'
import About from '../components/home/About'
import AuthWrapper from './auth/AuthWrapper'
import Box from '@mui/material/Box';
import ClockLoader from 'react-spinners/ClockLoader'
import AnimatedPage from '../components/AnimatedPage'

const HomePage = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [page, setPage] = useState(0);

  const changePage = (index) => {
    setPage(index)
  }
  const [loading, setLoading] = useState(false)

  useEffect(()=> {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  },[])


  const {t, i18n} = useTranslation()

  return (
    <>
        {loading ?  
          <AnimatedPage>
            <AuthWrapper>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
              >
                <ClockLoader  size={200} loading={loading} color={'#36D7B7'}></ClockLoader>
              </Box>
            </AuthWrapper>
          </AnimatedPage>
        : <>
          <AnimatedPage>
              <HomeHeader index={page} changePage={changePage}></HomeHeader>
              {page === 0 ? <Home/> : page === 1 ? <About/> : ""}  
          </AnimatedPage>
            
          </>
        }
    </>
  )
}

export default HomePage
