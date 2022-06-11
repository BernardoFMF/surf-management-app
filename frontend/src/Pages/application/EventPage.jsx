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
import { red, blue , green } from "@mui/material/colors";
import Chip from '@mui/material/Chip';
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

    function getChipProps(params) {
        return {
            label: t(params.row.state_),
            style: {
                borderColor:params.row.state_ === "interested" ? blue[500] : params.row.state_ === "not going" ? red[500] : green[500]
            }
        }
    }

    const columns = [
        { field: 'member_id_', headerName: t('member_id'), width: 120 },
        { field: 'username_', headerName: t("username"), headerAlign: "left", width: 150 },
        { field: 'email_', headerName: "Email", width: 200 },
        { field: 'phone_number_', headerName: t('candidates_phone_number'), width: 150 },
        {
            field: "state_",
            headerName: t('event_state'),
            width: 160,
            description: "States",
            headerAlign: "left",
            renderCell: (params) => {
              return <Chip variant="outlined" size="small" {...getChipProps(params)} />;
            }
        },    
    ];

    const changePageHandler = (event, value) => {
        setPage(value)
        dispatch(getEventAttendance(id, (value-1)*limit, limit))
    }
    return (
        <>
            <MainCard title={eventGet !==undefined ? eventGet.name_ : ""}>
 
            <br/>
            { loading || a_loading? 
                <Stack alignItems="center">
                    <CircularProgress size='4rem'/>
                </Stack> : (
                <>
                    <Grid container direction={ { xs: "column", md: "row"} } spacing={2}>
                        <Grid item xs>
                            <h2>{t("event_list")}</h2>
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
                        </Grid>
                        <Grid sx={{ml:{ md: 1}}} item xs>
                            <h2>{t("event_information")}</h2>
                            <b>{eventGet !==undefined ? t("start_date") + ": " : ""}</b> {eventGet !==undefined ? eventGet.initial_date_ : ""}
                            <Divider orientation="horizontal" flexItem sx={{mb: 1}}/>
                            <b>{eventGet !==undefined ? t("end_date") + ": " : ""}</b> {eventGet !==undefined ? eventGet.end_date_ : ""}
                            <Divider orientation="horizontal" flexItem sx={{mb: 1}}/>
                            <b>{eventAttendanceGet !==undefined ? t("event_people_going")  : ""}</b> {eventAttendanceGet !==undefined ? eventAttendanceGet.going : ""}
                            <Divider orientation="horizontal" flexItem sx={{mb: 1}}/>
                            <b>{eventAttendanceGet !==undefined ? t("event_people_not_going")  : ""}</b> {eventAttendanceGet !==undefined ? eventAttendanceGet.not_going : ""}
                            <Divider orientation="horizontal" flexItem sx={{mb: 1}}/>
                            <b>{eventAttendanceGet !==undefined ? t("event_people_interested")  : ""}</b> {eventAttendanceGet !==undefined ? eventAttendanceGet.interested : ""}
                            <Divider orientation="horizontal" flexItem sx={{mb: 1}}/>
                        </Grid>
                    </Grid> 
                </>
            )}
            </MainCard> 
        </>
    )
}

export default EventPage