import React, { useEffect, useState } from 'react'
import {Grid, Stack, CircularProgress} from '@mui/material'
import MainCard from '../../components/cards/MainCard'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux';
import { getEvent , getEventAttendance} from '../../store/actions/eventActions';
import Divider from '@mui/material/Divider';
import { DataGrid} from '@mui/x-data-grid';
import { Pagination } from '@mui/material';

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

    const [page, setPage] = useState(1);
    let limit = 5

    const [rows, setRows] = useState([]);

    useEffect(() => {
        dispatch(getEvent(id))
        dispatch(getEventAttendance(id, 0, limit))
    },[])

    useEffect(() => {
        if(eventAttendanceGet && eventAttendanceGet.text){
            setRows(eventAttendanceGet.text.map(event => {
                let x = {
                    ...event, id: event.member_id_
                }
                return x
            }))
        }
    },[eventAttendanceGet])

    const columns = [
        { field: 'member_id_', headerName: t('member_id'), width: 120 },
        { field: 'username_', headerName: t("username"), headerAlign: "left", width: 150 },
        { field: 'email_', headerName: "Email", width: 200 },
        { field: 'phone_number_', headerName: t('candidates_phone_number'), width: 150 },
        { field: 'state_', headerName: t('event_state'), headerAlign: "left", width: 150 },
    ];

    const changePageHandler = (event, value) => {
        setPage(value)
        dispatch(getEventAttendance(id, (value-1)*limit, limit))
    }
    return (
        <>
            <MainCard title={eventGet !==undefined ? eventGet.name_ : ""}>
            <h2>{t("event_information")}</h2>
            <br></br>
                <Grid container>
                    <Grid item xs>
                    <b>{eventGet !==undefined ? t("start_date") : ""}</b> {eventGet !==undefined ? eventGet.initial_date_ : ""}
                    </Grid>
                    <Divider orientation="vertical" flexItem>
                    </Divider>
                    <Grid item xs>
                        <b>{eventGet !==undefined ? t("end_date") : ""}</b> {eventGet !==undefined ? eventGet.end_date_ : ""}
                    </Grid>
                </Grid>
                <br></br>
                <br></br>
                <h3>{t("event_list")}</h3>
                <br></br>
                { loading || a_loading? 
                    <Stack alignItems="center">
                        <CircularProgress size='4rem'/>
                    </Stack> : (
                    <>
                        <DataGrid
                        autoHeight
                        rows={rows}
                        columns={columns}
                        pageSize={limit}
                        hideFooter={true}
                        sx={{
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "rgba(219, 219, 219, 0.5)"
                            }
                        }}
                        />
                        <Pagination sx={{ mt: 2 }} variant="outlined" shape='rounded' color="primary" count={Math.ceil(eventAttendanceGet !==undefined ? eventAttendanceGet.number_of_attendance / limit : 1)} page={page} onChange={changePageHandler} showFirstButton showLastButton/>
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
                    </>
                )}

            </MainCard> 
        </>
    )
}

export default EventPage