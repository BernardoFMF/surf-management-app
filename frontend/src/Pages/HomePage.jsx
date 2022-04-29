import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import default_video from './../../src/assets/data/homePageVideo.mp4'
import default_background from './../../src/assets/data/homeBackground.jpg'
import './../../src/assets/scss/homePage.scss'
import HomeHeader from '../layout/homeHeader'
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    useMediaQuery,
    Alert,

} from '@mui/material'


const HomePage = () => {
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
        <Box sx={{ padding: '100px 200px' , flexGrow: 1, display: 'absolute' }}>
              <Typography>
                  GAYZAO
              </Typography>
        </Box>
    </>
  )
}

export default HomePage
