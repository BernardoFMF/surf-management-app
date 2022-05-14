import React, { useEffect, useState } from 'react'
import { Box, Container, Grid, Typography, Stack, Alert, Avatar, useMediaQuery } from '@mui/material'
import MainCard from '../../components/cards/MainCard'
import SubCard from '../../components/cards/SubCard'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux';
import { getEvent , getEventAttendance} from '../../store/actions/eventActions';
import Divider from '@mui/material/Divider';
import { getTypes } from '../../store/actions/typeActions'
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
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

import useScriptRef from '../../hooks/useScriptRef'

import TabPanel from '../../components/tabs/TabPanel'

const EventPage = () => {

    let { id } = useParams()
    const scriptedRef = useScriptRef()

    const {t, i18n} = useTranslation()

    const dispatch = useDispatch()
    const eventFetch = useSelector((state) => state.eventFetch)
    const { loading, error, eventGet } = eventFetch

    const eventAttendanceFetch = useSelector((state) => state.eventAttendanceFetch)
    const { a_loading, a_error, eventAttendanceGet } = eventAttendanceFetch

    const [rows, setRows] = useState([]);

    useEffect(() => {
        dispatch(getEvent(id))
        dispatch(getEventAttendance(id))
    },[])

    useEffect(() => {
        console.log(eventAttendanceGet)
        if(eventAttendanceGet){
            setRows(eventAttendanceGet.text.map(event => {
                let x = {
                    ...event, id: event.member_id_
                }
                return x
            }))
        }
    },[eventAttendanceGet])

    const columns = [
        { field: 'username_', headerName: "Name", headerAlign: "left", width: 100 },
        { field: 'state_', headerName: t('state'), headerAlign: "left", width: 150 },
    ];

    return (
        <>
            <MainCard title={eventGet !==undefined ? eventGet.name_ : ""}>
                <Grid container>
                    <Grid item xs>
                        {eventGet !==undefined ? "Initial Date:  " + eventGet.initial_date_ : ""}
                    </Grid>
                    <Divider orientation="vertical" flexItem>
                    </Divider>
                    <Grid item xs>
                        {eventGet !==undefined ? "End Date  " + eventGet.end_date_ : ""}
                    </Grid>
                </Grid>
            </MainCard>
            <MainCard title='Attendance'sx={{height: '100%'}}>
                <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                experimentalFeatures={{ newEditingApi: true }}
                /> 
                <br></br>
                <br></br>
                <br></br>
                <Grid container>
                    <Grid item xs>
                        {eventAttendanceGet !==undefined ? t("event_people_going") + ": " + eventAttendanceGet.going : "" }
                    </Grid>
                    <Divider orientation="vertical" flexItem>
                    </Divider>
                    <Grid item xs>
                        {eventAttendanceGet !==undefined ? t("event_people_not_going") + ": " + eventAttendanceGet.not_going : "" }
                    </Grid>
                    <Divider orientation="vertical" flexItem>
                    </Divider>
                    <Grid item xs>
                        {eventAttendanceGet !==undefined ? t("event_people_interested") + ": " + eventAttendanceGet.interested : "" }
                    </Grid>
                </Grid>
            </MainCard> 
        </>
    )
}

export default EventPage