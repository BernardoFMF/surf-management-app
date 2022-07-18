import React, { useEffect, useState } from 'react'
import {Grid, Stack, CircularProgress, Box, Alert} from '@mui/material'
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
import DropdownInputField from '../../components/multiStepForm/DropdownInputField'
import { Form, Formik } from 'formik';
import AnimateButton from '../../components/extended/AnimateButton'
import LoadingButton from '@mui/lab/LoadingButton'
import SearchIcon from '@mui/icons-material/Search';
import Meta from '../../components/Meta'
import UpcomingEventsChartWrapper from '../../components/chartWrappers/UpcomingEventsChartWrapper'
import { EVENT_ATTENDANCE_FETCH_RESET, EVENT_FETCH_RESET } from '../../store/constants/eventConstants'
import useLang from '../../hooks/useLang'

const EventPage = () => {
    let { id } = useParams()
    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()
    const { lang } = useLang()
    const eventFetch = useSelector((state) => state.eventFetch)
    const { loading, error, eventGet } = eventFetch

    const eventAttendanceFetch = useSelector((state) => state.eventAttendanceFetch)
    const { loading: loadingAttendance, error: errorAttendance, eventAttendanceGet } = eventAttendanceFetch

    const [page, setPage] = useState(1);

    const [rows, setRows] = useState([]);

    const [ searchState, setSearchState ] = useState({
        limit: 10
    })

    useEffect(() => {
        dispatch(getEvent(id))
        dispatch(getEventAttendance(id, 0, searchState.limit))
        return () => {
            dispatch({ type: EVENT_FETCH_RESET })
            dispatch({ type: EVENT_ATTENDANCE_FETCH_RESET })
        }
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
            { loading || loadingAttendance ? 
                <Stack alignItems="center">
                    <CircularProgress size='4rem'/>
                </Stack> : (
                <>
                    <Meta title={eventGet.name_ + ' | ' + t('event_page_title')}/>
                    { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error" onClose={() => dispatch({ type: EVENT_FETCH_RESET })}>{t(error)}</Alert></Box> }
                    { errorAttendance && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error" onClose={() => dispatch({ type: EVENT_ATTENDANCE_FETCH_RESET })}>{t(errorAttendance)}</Alert></Box> }
                    <Grid container direction={ { xs: "column", md: "row"} } spacing={2}>
                        <Grid item xs={12} md={6}>
                            <DataGrid
                                autoHeight
                                rows={rows}
                                columns={columns}
                                pageSize={searchState.limit}
                                hideFooter={true}
                                localeText={lang}
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
                        { eventGet && eventAttendanceGet.text.length !== 0 && <Grid item xs={12} md={6}>
                            <UpcomingEventsChartWrapper 
                                loading={loading} 
                                dropdownOptions={eventAttendanceGet.text.map(obj => { let newObj = { label: obj.name_, value: obj.event_id_}; return newObj })} 
                                data={eventAttendanceGet.text.map(obj => { let newObj = { id: obj.event_id_, state: obj.state_, count: 0}; return newObj })} 
                                attendance={eventAttendanceGet}
                                title={t('attendance')}
                            />
                        </Grid>
                        }
                    </Grid> 
                </>
            )}
            
            </MainCard> 
        </>
    )
}

export default EventPage