import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEvents, deleteEvent, createEvent } from '../../store/actions/eventActions'
import * as Yup from 'yup';
import { parse, isDate } from "date-fns";

import { useTranslation } from 'react-i18next'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event'
import MainCard from '../../components/cards/MainCard';
import { red, blue , green } from "@mui/material/colors";
import Chip from '@mui/material/Chip';
import { useNavigate } from 'react-router';
import {  Stack, CircularProgress, Grid} from '@mui/material'
import AnimateButton from '../../components/extended/AnimateButton'
import LoadingButton from '@mui/lab/LoadingButton'

import DateInputField from '../../components/multiStepForm/DateInputField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import InputField from '../../components/multiStepForm/InputField';
import { Formik, Form } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import { Pagination } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const AllEventsPage = () => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const eventsFetch = useSelector((state) => state.eventsFetch)
    const { loading, error, eventsGet } = eventsFetch
    const [rows, setRows] = useState([]);
    
    const [openSubmit, setOpenSubmit] = React.useState(false);
    const handleCloseSubmit = () => setOpenSubmit(false);
    const handleOpenSubmit = () => setOpenSubmit(true);

    const [page, setPage] = useState(1);
    const limit = 5

    const [ searchState, setSearchState ] = useState({
        name_filter: '',
        event_initial_date_filter: '',
        event_end_date_filter: ''
    })

    function formatDate(date) {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();
	
		if (month.length < 2) 
			month = '0' + month;
		if (day.length < 2) 
			day = '0' + day;
	
		return [year, month, day].join('-');
	}

    const parseDate = (originalValue) => {
        let parsedDate = isDate(originalValue)
            ? originalValue
            : parse(originalValue, "yyyy-MM-dd", new Date())

        return parsedDate
    }

    useEffect(() => {
        dispatch(getEvents(searchState.name_filter, searchState.initial_date_filter, searchState.end_date_filter, 0, limit))
    },[])

    useEffect(() => {
        if(eventsGet && eventsGet.events){
            setRows(eventsGet.events.map(event => {
                let x = {
                    ...event, id: event.id_
                }
                return x
            }))
        }
    },[eventsGet])

    const handleSubmitCreate = async (values) => {
        let initial_date = formatDate(values.event_initial_date)
        let end_date = formatDate(values.event_end_date)
        dispatch(createEvent(values.name, initial_date, end_date))
        dispatch(getEvents(searchState.name_filter, searchState.initial_date_filter, searchState.end_date_filter, 0, limit))
        handleCloseSubmit()
    }

    const deleteEventHandle = React.useCallback(
      (id) => () => {
        setTimeout(() => {
            dispatch(deleteEvent(id))
            setRows((prevRows) => prevRows.filter(row => row.id !== id))
        });
      },
      [],
    );
  
    function getChipProps(params) {
        return {
            label: t(params.row.status),
            style: {
                borderColor:params.row.status === "status_not_started" ? blue[500] : params.row.status === "status_event_ended" ? red[500] : green[500]
            }
        }
    }

    const searchHandler = async(values) => {
        const new_values = values
        if(values.event_initial_date_filter) {
            let date = values.event_initial_date_filter.toLocaleString().split(',')[0]
            date = date.split('/')
            const p_date = `${date[2]}-${date[1]}-${date[0]}`
            new_values.event_initial_date_filter = p_date
        }
        if(values.event_end_date_filter) {
            let date = values.event_end_date_filter.toLocaleString().split(',')[0]
            date = date.split('/')
            const p_date = `${date[2]}-${date[1]}-${date[0]}`
            new_values.event_end_date_filter = p_date
        }
        setSearchState(new_values)
        setPage(1)
        setRows([])
        dispatch(getEvents(new_values.name_filter, new_values.event_initial_date_filter, new_values.event_end_date_filter, 0, limit))
    }

    const changePageHandler = (event, value) => {
        setPage(value)
        dispatch(getEvents(searchState.name_filter, searchState.initial_date_filter, searchState.end_date_filter,  (value-1)*limit, limit))
    }

const columns = [
    { field: 'id_', headerName: "ID", headerAlign: "left", width: 100 },
    { field: 'name_', headerName: t('name'), headerAlign: "left", width: 180 },
    { field: 'initial_date_', headerName: t('event_initial_date'), headerAlign: "left", width: 130 },
    { field: 'end_date_', headerName: t('event_end_date'), headerAlign: "left", width: 170 },
    {
        field: "status",
        headerName: "Status",
        width: 160,
        description: "Status",
        headerAlign: "left",
        renderCell: (params) => {
          return <Chip variant="outlined" size="small" {...getChipProps(params)} />;
        }
    },
    {
        field: 'actions',
        type: 'actions',
        width: 110,
        getActions: (params) => [
            <GridActionsCellItem
            icon={<EventIcon />}
            label="Show Event"
            onClick={() => navigate(`/application/events/${params.id}`)}
            />,
            <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete Event"
            onClick={deleteEventHandle(params.id)}
            disabled={params.row.is_deleted_}
            />
        ],
    },
];


  return (
    <>
        <Dialog
            fullWidth={true}
            open={openSubmit}
            onClose={handleCloseSubmit}
        >
            <Typography sx={{pl: 5, pt: 5}}  variant="h2" component="h2">
                {t('create_event')}
            </Typography>
            <DialogContent>
                <Box
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    m: '24',
                    width: 'fit-content'
                    }}
                >
                    <Formik
                        initialValues={{
                            name: '',
                            event_initial_date: '',
                            event_end_date: ''
                        }}
                        validationSchema={Yup.object().shape({
                            name: Yup.string().required(t('sign_up_username_mandatory')),
                            event_initial_date: Yup.date().transform(parseDate).typeError(t('sign_up_valid_date')).required(t('initial_date_mandatory')),
                            event_end_date: Yup.date().transform(parseDate).typeError(t('sign_up_valid_date')).required(t('end_date_mandatory')),
                        })}
                        onSubmit={handleSubmitCreate}
                    >
                    {Formik => (
                        <Form>
                            <InputField name='name' label={t('name')} type='text'></InputField>
                            <DateInputField name='event_initial_date' label={t('event_initial_date')}></DateInputField>
                            <DateInputField name='event_end_date' label={t('event_end_date')}></DateInputField>
                            <AnimateButton>
                                <LoadingButton
                                    disableElevation
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    loading = {loading}
                                >
                                    {t('confirm')}
                                </LoadingButton>
                            </AnimateButton>
                        </Form>
                    )}
                    </Formik>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseSubmit}>Close</Button>
            </DialogActions>
        </Dialog>
      <MainCard title={t('all_events')} sx={{height: '100%'}}>
            <Box
                sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 1,
                gridTemplateRows: 'auto',
                gridTemplateAreas: `". . . ."
                "search search search create"
                ". . . ."`,
                }}
            >
            <Box gridArea={'search'}>
            <Formik
                    initialValues={searchState}
                    enableReinitialize={true}
                    onSubmit={values => searchHandler(values)}
                >
                {formik => (
                    <Form>
                        <Grid container spacing={2} direction="row" alignItems={'center'} >
                            <Grid item>
                                <InputField name='name_filter' label={t('name')} type='text'></InputField>
                            </Grid>
                            <Grid item>
                                <DateInputField name='event_initial_date_filter' label={t('event_initial_date')}></DateInputField>
                            </Grid>
                            <Grid item>
                                <DateInputField name='event_end_date_filter' label={t('event_end_date')}></DateInputField>
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
                                        {t('Search')}
                                    </LoadingButton>
                                </AnimateButton>
                            </Grid>    
                        </Grid>
                    </Form>
                )}
            </Formik>
            </Box>
                <Box gridArea={'create'} alignItems={'center'} display='flex' justifyContent='flex-end'>
                    <AnimateButton>
                        <LoadingButton
                            disableElevation
                            size="large"
                            variant="outlined"
                            color="secondary"
                            onClick={() => {
                                handleOpenSubmit()
                            }}
                        >
                            {t('create')}
                        </LoadingButton>
                    </AnimateButton>
                </Box> 
            </Box>
      { loading ? 
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
                        onPageChange={changePageHandler}
                        sx={{
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "rgba(219, 219, 219, 0.5)"
                            }
                        }}
                    /> 
                <Pagination sx={{ mt: 2 }} variant="outlined" shape='rounded' color="primary" count={Math.ceil(eventsGet.number_of_events / limit)} page={page} onChange={changePageHandler} showFirstButton showLastButton/>
                </>
            )}
      </MainCard> 
    </>
  )
}

export default AllEventsPage