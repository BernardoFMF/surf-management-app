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
import DropdownInputField from '../../components/multiStepForm/DropdownInputField'
import { Form, Formik } from 'formik';
import AnimateButton from '../../components/extended/AnimateButton'
import LoadingButton from '@mui/lab/LoadingButton'
import SearchIcon from '@mui/icons-material/Search';

const EventPage = () => {

    let { id } = useParams()
    const scriptedRef = useScriptRef()

    const {t, i18n} = useTranslation()

    const dispatch = useDispatch()
    const eventFetch = useSelector((state) => state.eventFetch)
    const { error, eventGet } = eventFetch

    const eventAttendanceFetch = useSelector((state) => state.eventAttendanceFetch)
    const { loading, a_error, eventAttendanceGet } = eventAttendanceFetch

    const [page, setPage] = useState(1);

    const [rows, setRows] = useState([]);
    const [ searchState, setSearchState ] = useState({
        limit: 10
    })
    useEffect(() => {
        dispatch(getEvent(id))
        dispatch(getEventAttendance(id, 0, searchState.limit))
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
        { field: 'member_id_', headerName: t('member_id'), width: 120 ,headerAlign: "center",align:'center'},
        { field: 'username_', headerName: t("username"), headerAlign: "left", width: 150 ,headerAlign: "center",align:'center'},
        { field: 'email_', headerName: "Email", width: 200 ,headerAlign: "center",align:'center'},
        { field: 'phone_number_', headerName: t('candidates_phone_number'), width: 150 ,headerAlign: "center",align:'center'},
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
        dispatch(getEventAttendance(id, (value-1)*searchState.limit, searchState.limit))
    }
    
    const searchHandler = async(values) => {
        setSearchState(values)
        setPage(1)
        setRows([])
        dispatch(getEventAttendance(id, 0, values.limit))
    }
    return (
        <>
            <MainCard title={eventGet !==undefined ? eventGet.name_ : ""}>
            <br/>
            { loading? 
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
                                    pageSize={searchState.limit}
                                    hideFooter={true}
                                    sx={{
                                        "& .MuiDataGrid-columnHeaders": {
                                            backgroundColor: "rgba(219, 219, 219, 0.5)"
                                        }
                                    }}
                                    />
                            <Grid container>
                                <Grid item>
                                    <Pagination sx={{ mt: 2 }} variant="outlined" shape='rounded' color="primary" count={Math.ceil(eventAttendanceGet !==undefined ? eventAttendanceGet.number_of_attendance / searchState.limit : 1)} page={page} onChange={changePageHandler} showFirstButton showLastButton/>                            
                                </Grid>
                                <Grid item>
                                    <Formik
                                        initialValues={searchState}
                                        enableReinitialize={true}
                                        onSubmit={values => searchHandler(values)}
                                    >
                                        {formik => (
                                            <Form>
                                                <Grid container spacing={2} direction="row" alignItems={'center'} sx={{ml : 0.5}}>
                                                    <Grid item>
                                                        <DropdownInputField name='limit' label={t('rows')} options={[10, 15, 20]} ></DropdownInputField>
                                                    </Grid>
                                                    <Grid item>
                                                        <AnimateButton>
                                                            <LoadingButton
                                                                disableElevation
                                                                size="large"
                                                                type="submit"
                                                                variant="contained"
                                                                color="primary"
                                                                loading = {loading}
                                                                startIcon={<SearchIcon></SearchIcon>}
                                                            >
                                                                {t('search')}
                                                            </LoadingButton>
                                                        </AnimateButton>
                                                    </Grid>    
                                                </Grid>
                                            </Form>
                                        )}
                                    </Formik>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid sx={{mt: 0.5}} item xs>
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
                            <b>{eventAttendanceGet !==undefined ? t("event_people_none")  : ""}</b> {eventAttendanceGet !==undefined ? eventAttendanceGet.none : ""}
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