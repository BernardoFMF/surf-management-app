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

import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import HomeIcon from '@mui/icons-material/Home';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

import useScriptRef from '../../hooks/useScriptRef'

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
            <h2>{t("event_information")}</h2>
            <br></br>
                <Grid container>
                    <Grid item xs>
                    <b>{eventGet !==undefined ? "Initial Date:  ": ""}</b> {eventGet !==undefined ? eventGet.initial_date_ : ""}
                    </Grid>
                    <Divider orientation="vertical" flexItem>
                    </Divider>
                    <Grid item xs>
                        <b>{eventGet !==undefined ? "End Date:  ": ""}</b> {eventGet !==undefined ? eventGet.end_date_ : ""}
                    </Grid>
                </Grid>
                <br></br>
                <br></br>
                <h3>{t("event_list")}</h3>
                <br></br>
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
                        <b>{eventAttendanceGet !==undefined ? t("event_people_going")  : ""}</b> {eventAttendanceGet !==undefined ? eventAttendanceGet.going : ""}
                    </Grid>
                    <Divider orientation="vertical" flexItem>
                    </Divider>
                    <Grid item xs>
                    <b>{eventAttendanceGet !==undefined ? t("event_people_not_going")  : ""}</b> {eventAttendanceGet !==undefined ? eventAttendanceGet.not_going : ""}
                    </Grid>
                    <Divider orientation="vertical" flexItem>
                    </Divider>
                    <Grid item xs>
                    <b>{eventAttendanceGet !==undefined ? t("event_people_interested")  : ""}</b> {eventAttendanceGet !==undefined ? eventAttendanceGet.interested : ""}
                    </Grid>
                </Grid>
            </MainCard> 
        </>
    )
}

export default EventPage