import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { useEffect } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Button, Grid, Menu, MenuItem, Typography, Select,InputLabel, FormControl } from '@mui/material';

// project imports
import MainCard from './cards/MainCard';

// assets

import AnimatedPage from './AnimatedPage'

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.secondary[800],
        borderRadius: '50%',
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.secondary[800],
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const OverviewCard = ({ label, icon, path }) => {
    const theme = useTheme();
    const {t, i18n} = useTranslation()
    const navigate = useNavigate()
    
    return (
        <>
            <AnimatedPage>
                <CardWrapper border={false} content={false} >
                    <Box sx={{ p: 1 }} >
                        <Grid container direction={'row'} spacing={2}>
                            <Grid item >
                            <Avatar
                                variant="rounded"
                                sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.largeAvatar,
                                    backgroundColor: theme.palette.secondary[800],
                                    mt: 1,
                                    width:50,
                                    height:50

                                }}
                                onClick={() => navigate(path)}
                            >
                                {icon}
                            </Avatar>
                            </Grid>
                            <Grid item zIndex={100} justifyContent={'center'} >
                                <Typography  sx={{ mt:2, fontSize: '1.2rem' , fontWeight: 500}} color={theme.palette.primary.contrastText}>{label}</Typography>  
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            </AnimatedPage>
        </>
    );
};

OverviewCard.propTypes = {
    isLoading: PropTypes.bool
};

export default OverviewCard;