import React, { useState } from 'react'
import { Grid, useMediaQuery, Tabs, Tab } from '@mui/material'
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next'

import PersonalDetailsTab from '../../components/tabs/PersonalDetailsTab'
import AddressInformationTab from '../../components/tabs/AddressInformationTab'
import MembershipCardTab from '../../components/tabs/MembershipCardTab'
import AdminPrivilegesTab from '../../components/tabs/AdminPrivilegesTab'

import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import HomeIcon from '@mui/icons-material/Home';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import TabPanel from '../../components/tabs/TabPanel'

const MemberProfile = () => {
    const { t } = useTranslation()

    const memberFetch = useSelector((state) => state.memberFetch)
    const { memberGet } = memberFetch

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const mediumViewport = useMediaQuery('(min-width:600px)');

    return (
        <Grid container spacing={4} sx={{ pt: 4, pl: 4 }} display={{ sm: "flex" }} justifyContent={{ sm: 'center', md: 'flex-start'}}>
            <Tabs
                orientation={mediumViewport ? "vertical" : "horizontal"}
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Profile tabs"
                sx={{ borderRight: 1, borderColor: 'divider', width: 400}}
            >
                <Tab icon={<PersonRoundedIcon/>} label={t('personal_details')} {...{id: `vertical-tab-${0}`, 'aria-controls': `vertical-tabpanel-${0}`}} />

                <Tab icon={<HomeIcon/>} label={t('address_information')} {...{id: `vertical-tab-${1}`, 'aria-controls': `vertical-tabpanel-${1}`}} />

                <Tab icon={<CreditCardIcon/>} label={t('membership_card')} {...{id: `vertical-tab-${2}`, 'aria-controls': `vertical-tabpanel-${2}`}} />

                <Tab icon={<AdminPanelSettingsIcon/>} disabled={memberGet.is_admin_ === false} label={t('admin_privileges')} {...{id: `vertical-tab-${3}`, 'aria-controls': `vertical-tabpanel-${3}`}} />
            </Tabs>

            <TabPanel value={value} index={0}><PersonalDetailsTab/></TabPanel>

            <TabPanel value={value} index={1}><AddressInformationTab/></TabPanel>

            <TabPanel value={value} index={2}><MembershipCardTab/></TabPanel>

            <TabPanel value={value} index={3}><AdminPrivilegesTab/></TabPanel>
        </Grid>
    )
}

export default MemberProfile