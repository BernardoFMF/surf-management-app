import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import default_video from './../../src/assets/data/homePageVideo.mp4'
import default_background from './../../src/assets/data/homeBackground.jpg'
import './../../src/assets/scss/homePage.scss'
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
    Alert
} from '@mui/material'

const HomePage = () => {
  return (
    <>
        <div className='Home'>
            <div id = "homeText" >
                <h1>Ericeira Surf Club Manage App.</h1>
            </div>
            <video
            id = 'homeVideo'
            poster={default_background}
            autoPlay
            muted
            loop
            >
                <source src = {default_video} type = "video/mp4" />
            </video>
        </div>
    </>
  )
}

export default HomePage
