import React, { useEffect, useState } from 'react'
import { Box, Container, Grid, Typography, Stack, Alert, Avatar, useMediaQuery } from '@mui/material'
import MainCard from '../../components/cards/MainCard'
import SubCard from '../../components/cards/SubCard'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../store/actions/userActions';
import CircularProgress from '@mui/material/CircularProgress';
import default_image from './../../assets/data/blank-profile-picture.png'

import PersonalDetailsTab from '../../components/tabs/PersonalDetailsTab'
import AddressInformationTab from '../../components/tabs/AddressInformationTab'
import MembershipCardTab from '../../components/tabs/MembershipCardTab'
import AdminPrivilegesTab from '../../components/tabs/AdminPrivilegesTab'

import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import HomeIcon from '@mui/icons-material/Home';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import useScriptRef from '../../hooks/useScriptRef'

import TabPanel from '../../components/tabs/TabPanel'

const MemberProfile = () => {

    let { id } = useParams()
    const scriptedRef = useScriptRef()

    const {t, i18n} = useTranslation()

    const dispatch = useDispatch()
    const userFetch = useSelector((state) => state.userFetch)
    const { loading, error, userGet } = userFetch

    useEffect(() => {
        dispatch(getUserById(id))
    },[dispatch, id])

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const mediumViewport = useMediaQuery('(min-width:768px)');

    return (
        <>
            <MainCard title="Profile" >
            { loading ? 
                <Stack alignItems="center">
                    <CircularProgress size='4rem'/>
                </Stack>
                : ( <>
                    <Grid container spacing={4} sx={{ pt: 4, pl: 4 }}>
                        <Tabs
                            orientation={mediumViewport ? "vertical" : "horizontal"}
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            sx={{ borderRight: 1, borderColor: 'divider', width: 400}}
                        >
                            <Tab icon={<PersonRoundedIcon/>} label="Personal details" {...{id: `vertical-tab-${0}`, 'aria-controls': `vertical-tabpanel-${0}`}} />

                            <Tab icon={<HomeIcon/>} label="Address information" {...{id: `vertical-tab-${1}`, 'aria-controls': `vertical-tabpanel-${1}`}} />

                            <Tab icon={<CreditCardIcon/>} label="Membership card" {...{id: `vertical-tab-${2}`, 'aria-controls': `vertical-tabpanel-${2}`}} />

                            <Tab icon={<AdminPanelSettingsIcon/>} disabled={userGet.is_admin_ === false} label="Admin privileges" {...{id: `vertical-tab-${3}`, 'aria-controls': `vertical-tabpanel-${3}`}} />
                        </Tabs>

                        <TabPanel value={value} index={0}><PersonalDetailsTab user={userGet} /></TabPanel>

                        <TabPanel value={value} index={1}><AddressInformationTab user={userGet} /></TabPanel>

                        <TabPanel value={value} index={2}><MembershipCardTab user={userGet} /></TabPanel>

                        <TabPanel value={value} index={3}><AdminPrivilegesTab user={userGet} /></TabPanel>
                    </Grid>
                    </>
                )
                
                    
            }
            </MainCard>
        </>
    )
}

export default MemberProfile