import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMemberEventsAttendance} from '../../store/actions/eventActions'

import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EventIcon from '@mui/icons-material/Event'
import MainCard from '../../components/cards/MainCard';
import {  Stack, CircularProgress, Grid} from '@mui/material'
import { useNavigate } from 'react-router';
import { red, blue , green } from "@mui/material/colors";
import Chip from '@mui/material/Chip';
import { Pagination } from '@mui/material';
import InputField from '../../components/multiStepForm/InputField';
import Box from '@mui/material/Box';
import { Formik, Form } from 'formik';
import AnimateButton from '../../components/extended/AnimateButton'
import LoadingButton from '@mui/lab/LoadingButton'
import SearchIcon from '@mui/icons-material/Search';
import DateInputField from '../../components/multiStepForm/DateInputField';
import EditIcon from '@mui/icons-material/Edit';
import AttendanceEditDialog from '../../components/dialogs/AttendanceEditDialog';
import {  Alert} from '@mui/material'

const MyEventsPage = () => {
    const theme = useTheme();
    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const member = useSelector((state) => state.memberLogin)
    const { memberInfo } = member

    const memberEventsAttendanceFetch = useSelector((state) => state.memberEventsAttendanceFetch)
    const { loading, error, memberEventsAttendanceGet } = memberEventsAttendanceFetch
    const [rows, setRows] = useState([]);
    let { id } = useParams()
    const [row, setRow] = useState({});
    
    const [openSubmit, setOpenSubmit] = React.useState(false);
    const handleCloseSubmit = () => {setOpenSubmit(false); dispatch(getMemberEventsAttendance(id,searchState.name_filter,searchState.state_filter,searchState.date_filter,(page-1)*limit,limit));};
    const handleOpenSubmit = (row) => {setOpenSubmit(true); setRow(row)};

    useEffect(() => {
        dispatch(getMemberEventsAttendance(id,searchState.name_filter,searchState.state_filter,searchState.date_filter,0,limit))
    },[dispatch,id])

    const [page, setPage] = useState(1);
    const limit = 5

    const [ searchState, setSearchState ] = useState({
        name_filter: "",
        state_filter: "",
        date_filter: ""
    })

    useEffect(() => {
        if(memberEventsAttendanceGet){
            setRows(memberEventsAttendanceGet.events.map(memberEvent => {
                let x = {
                    ...memberEvent, id: memberEvent.event_id_
                }
                x.initial_date_ = x.initial_date_.split('T')[0]
                if(x.end_date_)x.end_date_= x.end_date_.split('T')[0]
                return x
            }))
        }
    },[memberEventsAttendanceGet])

    function getChipProps(params) {
        return {
            label: t(params.row.state_),
            style: {
                borderColor:params.row.state_ === "interested" ? blue[500] : params.row.state_ === "not going" ? red[500] : params.row.state_ === "going" ? green[500] : undefined
            }
        }
    }

    const changePageHandler = (event, value) => {
        setPage(value)
        dispatch(getMemberEventsAttendance(id,searchState.name_filter, searchState.state_filter, searchState.date_filter, (value-1)*limit, limit))
    }

    const searchHandler = async(values) => {
        const new_values = values
        if(values.date_filter && values.date_filter.length === undefined) {
            let day = values.date_filter.getDate()
            let month = values.date_filter.getMonth() + 1
            let year = values.date_filter.getFullYear()
            const p_date = `${year}-${month}-${day}`
            new_values.date_filter = p_date
        }
        setSearchState(new_values)
        setPage(1)
        setRows([])
        
        dispatch(getMemberEventsAttendance(id,new_values.name_filter,new_values.state_filter,new_values.date_filter,0,limit))
    }

const columns = [
    { field: 'event_id_', headerName: 'ID', width: 100 ,headerAlign: "center",align:'center'},
    { field: 'name_', headerName: t('name'), width: 250 ,headerAlign: "center",align:'center'},
    {
        field: "state_",
        headerName: t('event_state'),
        width: 160,
        description: "States",
        headerAlign: "center",
        align: 'center',
        renderCell: (params) => {
          return <Chip variant="outlined" size="small" {...getChipProps(params)} />;
        }
    },
    { field: 'initial_date_', headerName: t('event_initial_date'), width: 150,headerAlign: "center",align:'center' },
    { field: 'end_date_', headerName: t('event_end_date'), width: 150,headerAlign: "center",align:'center' },
    {
        field: 'actions',
        type: 'actions',
        align:'center',
        headerName: t('actions'),
        width: 110,
        getActions: (params) => [
            <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit Event"
                onClick={() => {
                    handleOpenSubmit(params.row)
                }}
            />,
            memberInfo.is_admin ? <GridActionsCellItem
                icon={<EventIcon />}
                label="Show Event"
                onClick={() => navigate(`/application/events/${params.id}`)}
            /> : <></>
        ],
    },
];

  return (
    <>  
        <AttendanceEditDialog
            open={openSubmit}
            closeHandler={handleCloseSubmit} 
            row={row}    
        />
        <MainCard title={t('my_events')} sx={{height: '100%'}}>
            { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> }
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
                                    <InputField name='state_filter' label={t('event_state')} type='text' ></InputField>
                                </Grid>
                                <Grid item>
                                    <DateInputField name='date_filter' label={t('event_initial_date')}></DateInputField>
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
        <Pagination sx={{ mt: 2 }} variant="outlined" shape='rounded' color="primary" count={Math.ceil(memberEventsAttendanceGet.number_of_events / limit)} page={page} onChange={changePageHandler} showFirstButton showLastButton/>
        </>
      )}
      </MainCard> 
    </>
  )
}

export default MyEventsPage