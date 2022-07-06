import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { useEffect } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Button, Grid, Menu, MenuItem, Typography, Select,InputLabel, FormControl } from '@mui/material';

// project imports
import MainCard from '../cards/MainCard';
import SkeletonChartCard from '../skeletons/ChartCardSkeleton';

// assets
import DropdownInputField from '../../components/multiStepForm/DropdownInputField';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import countries from '../../assets/data/countries.json'
import AnimatedCard from '../AnimatedPage'

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

const UsersCardChart = ({ isLoading, obj }) => {
    const theme = useTheme();
    const {t, i18n} = useTranslation()
    const navigate = useNavigate()
    const [valueNationality, setValueNationality] = useState('')

    const changeDataNationality = (e) => {
        setValueNationality(e.target.value)
    }

    const [valueGender, setValueGender] = useState('')

    const changeDataGender = (e) => {
        setValueGender(e.target.value)
    }

    let usersCount = 0

    if(!valueGender && !valueNationality) {
        obj.forEach(element => {
            usersCount += parseInt(element.count)
        });
    } else {
        if(valueNationality) {
            obj.forEach(element => {
                if(element.nationality_ === valueNationality) {
                    if(valueGender === t('male') && element.gender_ === 'Male') usersCount += parseInt(element.count)
                    else if(valueGender === t('female') && element.gender_ === 'Female') usersCount += parseInt(element.count)
                    else if(valueGender === t('other') && element.gender_ === 'Other') usersCount += parseInt(element.count)
                    else if(!valueGender) usersCount += parseInt(element.count)
                } 
            });
        } else {
            obj.forEach(element => {
                if(valueGender === t('male') && element.gender_ === 'Male') usersCount += parseInt(element.count)
                if(valueGender === t('female') && element.gender_ === 'Female') usersCount += parseInt(element.count)
                if(valueGender === t('other') && element.gender_ === 'Other') usersCount += parseInt(element.count)
            });
        }
    }
    
    return (
        <>
            {isLoading ? (
                <SkeletonChartCard />
            ) : (
                <AnimatedCard>
                    <CardWrapper border={false} content={false} >
                        <Box sx={{ p: 2.25 }} height={'100%'}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Grid container spacing={2}>
                                        <Grid item >
                                            <Avatar
                                                variant="rounded"
                                                sx={{
                                                    ...theme.typography.commonAvatar,
                                                    ...theme.typography.largeAvatar,
                                                    backgroundColor: theme.palette.secondary[800],
                                                    mt: 1
                                                }}
                                                onClick={() => navigate(`/application/users`)}
                                            >
                                                <PersonRoundedIcon></PersonRoundedIcon>
                                            </Avatar>
                                        </Grid>
                                        <Grid item zIndex={100} sx={{ml: {xs: 0, md: 0, lg: 5, xl: 5}}}>
                                            <FormControl variant="standard" sx={{ minWidth: 120}}>
                                                <InputLabel id="gender-label" sx={{color: 'white'}}>{t('sign_up_gender')}</InputLabel>
                                                <Select
                                                    labelId="gender-label"
                                                    id="select-standard2"
                                                    value={valueGender}
                                                    onChange={changeDataGender}
                                                    label="gender"
                                                    sx={{color: 'white'}}
                                                >
                                                    <MenuItem key={'none'} value={''} >
                                                        {t('none')}
                                                    </MenuItem>
                                                    <MenuItem key={t('male')} value={'Male'}>
                                                        {t('male_for_donut')}
                                                    </MenuItem>
                                                    <MenuItem key={t('female')} value={'Female'}>
                                                        {t('female_for_donut')}
                                                    </MenuItem>
                                                    <MenuItem key={t('other')} value={'Other'}>
                                                        {t('other_for_donut')}
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid> 
                                        <Grid item zIndex={100} sx={{ml: {lg:1 ,md: 7.5, sm: 7.5, xs: 7.5}}}>
                                            <FormControl variant="standard" sx={{  minWidth: 120 }}>
                                                <InputLabel id="nationality-label" sx={{color: 'white'}}>{t('sign_up_nationality')}</InputLabel>
                                                <Select
                                                    labelId="nationality-label"
                                                    id="select-standard"
                                                    value={valueNationality}
                                                    onChange={changeDataNationality}
                                                    label="nationality"
                                                >
                                                    <MenuItem key={'none'} value={''} >
                                                        {t('none')}
                                                    </MenuItem>
                                                    {countries.map((option) => (
                                                        <MenuItem key={option} value={option} >
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>        
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container alignItems="center">
                                        <Grid item>
                                            <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                                {usersCount}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item sx={{ mb: 1.25 }}>
                                    <Typography
                                        sx={{
                                            fontSize: '1rem',
                                            fontWeight: 500,
                                            color: theme.palette.secondary[200]
                                        }}
                                    >
                                        {t('total_users')}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </CardWrapper>
                </AnimatedCard>
            )}
        </>
    );
};

UsersCardChart.propTypes = {
    isLoading: PropTypes.bool
};

export default UsersCardChart;