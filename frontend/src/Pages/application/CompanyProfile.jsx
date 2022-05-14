import React, { useState } from 'react'
import { Grid, useMediaQuery, Tabs, Tab } from '@mui/material'
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next'

import PersonalDetailsTab from '../../components/companyTabs/PersonalDetailsTab'
import AddressInformationTab from '../../components/companyTabs/AddressInformationTab'
import AdminPrivilegesTab from '../../components/companyTabs/AdminPrivilegesTab'

import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import TabPanel from '../../components/TabPanel'

const CompanyProfile = () => {
  const { t } = useTranslation()

  const memberLogin = useSelector((state) => state.memberLogin)
  const { memberInfo } = memberLogin

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

              <Tab icon={<AdminPanelSettingsIcon/>} disabled={memberInfo.is_admin_ === false} label={t('admin_privileges')} {...{id: `vertical-tab-${2}`, 'aria-controls': `vertical-tabpanel-${2}`}} />
          </Tabs>

          <TabPanel value={value} index={0}><PersonalDetailsTab/></TabPanel>

          <TabPanel value={value} index={1}><AddressInformationTab/></TabPanel>

          <TabPanel value={value} index={2}><AdminPrivilegesTab/></TabPanel>
      </Grid>
  )
}

export default CompanyProfile