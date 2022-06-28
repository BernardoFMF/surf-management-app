import { useState, useEffect } from 'react';
import { useFormikContext, useField } from 'formik'
import default_image from './../../src/assets/data/blank-profile-picture.png'

import { Button, Grid, Box, Avatar,Typography } from '@mui/material';
import AnimateButton from './extended/AnimateButton'
import { useTranslation } from 'react-i18next'

import { styled, useTheme } from '@mui/material/styles';

const AvatarBase64 = ({ label, size, memberInfo}) => {
    const {t, i18n} = useTranslation()
    const theme = useTheme();
    
    const [selectedImage, setSelectedImage] = useState(memberInfo.img_value_)
    const resolution = window.innerWidth;

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
            <Grid container  direction={ { xs: "column", md: "column"} } justifyContent={'center'}>
                <Grid item>
                {
                    selectedImage ?
                        <Box mt={2} ml={{md: 2, lg: 2}} display="flex" >
                            <Avatar
                                alt={selectedImage.name}
                                src={selectedImage}
                                sx={{ width: size, height: size}}
                            />
                            {resolution > 500 &&
                            <Grid container direction={ { xs: "row", md: "column"} } justifyContent={'center'}>
                                <Typography sx={{ml:7, fontSize: '2.0rem', fontWeight: 500}}>
                                    {t('sign_in_welcome')}
                                </Typography>
                                <Typography sx={{mt: 1, ml:7, fontSize: '1.9rem', fontWeight: 500}} color={theme.palette.primary.main}>
                                    {memberInfo.username_}
                                </Typography>
                            </Grid>
                            }
                            
                        </Box> :  
                        <Box mt={2} ml={2} display="flex" >
                            <Avatar
                                alt='blank-profile-picture.png'
                                src= {default_image} 
                                sx={{ width: size, height: size}}
                            />
                            <Grid container direction={ "column"}  justifyContent={'center'}>
                                <Typography sx={{ml:5, fontSize: '2.0rem', fontWeight: 500}}>
                                    {t('sign_in_welcome')}
                                </Typography>
                                <Typography sx={{mt: 1, ml:5, fontSize: '1.9rem', fontWeight: 500}} color={theme.palette.primary.main}>
                                    {memberInfo.username_}
                                </Typography>
                            </Grid>
                        </Box>
                } 
                </Grid>
                    {
                        resolution < 500 &&
                        <Grid container direction="column" textAlign={'center'} >
                            <Grid item>                
                                <Typography sx={{mt: 1, fontSize: '2.0rem', fontWeight: 500}}>
                                    {t('sign_in_welcome')}
                                </Typography>
                            </Grid>
                            <Grid item>                
                                <Typography sx={{mt: 1, fontSize: '1.9rem', fontWeight: 500}} color={theme.palette.primary.main}>
                                    {memberInfo.username_}
                                </Typography>
                            </Grid>
                        </Grid>
                    }
            </Grid>           
        </>
    );
};

export default AvatarBase64;