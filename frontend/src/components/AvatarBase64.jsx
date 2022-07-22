import { useState, useEffect } from 'react';
import { useFormikContext, useField } from 'formik'
import default_image from './../../src/assets/data/blank-profile-picture.png'

import { useMediaQuery, Grid, Box, Avatar,Typography } from '@mui/material';
import AnimateButton from './extended/AnimateButton'
import { useTranslation } from 'react-i18next'
import AnimatedPage from './AnimatedPage';
import { styled, useTheme } from '@mui/material/styles';

const AvatarBase64 = ({ label, size, memberInfo}) => {
    const {t, i18n} = useTranslation()
    const theme = useTheme();
    
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    const [selectedImage, setSelectedImage] = useState(memberInfo.img_value_)

    return (
        <>
            <input
                label={label}
                accept="image/jpeg"
                type="file"
                id="select-image"
                style={{ display: 'none' }}
                onChange={e => {if(e.target.files[0])setSelectedImage(e.target.files[0])}}
            />
            <AnimatedPage>
            <Grid container justifyContent="center" alignItems="center" spacing={2} direction={ matchDownSM ? "column" : "row"} >
                <Grid item>
                    <Box mt={2} display="flex" justifyContent={'center'} >
                        {
                            selectedImage ?
                                <Avatar
                                    alt={selectedImage.name}
                                    src={selectedImage}
                                    sx={{ width: size, height: size}}
                                />                 
                                :  
                                <Avatar
                                    alt='blank-profile-picture.png'
                                    src= {default_image} 
                                    sx={{ width: size, height: size}}
                                />
                        }
                    </Box> 
                </Grid>
                <Grid item alignContent={'center'}>
                    <Typography sx={{fontSize: '1.6rem', fontWeight: 500}}>
                        {t('sign_in_welcome')}
                    </Typography>
                    <Typography sx={{ fontSize: '1.5rem', fontWeight: 500}} color={theme.palette.primary.main}>
                        {memberInfo.username_}
                    </Typography>
                </Grid>  
            </Grid>
            </AnimatedPage>
           
        </>
    );
};

export default AvatarBase64;