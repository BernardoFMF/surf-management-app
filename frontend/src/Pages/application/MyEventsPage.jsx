import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMemberEventsAttendance} from '../../store/actions/eventActions'

import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EventIcon from '@mui/icons-material/Event'
import MainCard from '../../components/cards/MainCard';
import {  Stack, CircularProgress} from '@mui/material'
import { useNavigate } from 'react-router';

const MyEventsPage = () => {
    const theme = useTheme();
    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const memberEventsAttendanceFetch = useSelector((state) => state.memberEventsAttendanceFetch)
    const { loading, error, memberEventsAttendanceGet } = memberEventsAttendanceFetch
    const [rows, setRows] = useState([]);
    let { id } = useParams()
    
    useEffect(() => {
        dispatch(getMemberEventsAttendance(id))
    },[dispatch,id])

    useEffect(() => {
        if(memberEventsAttendanceGet){
            setRows(memberEventsAttendanceGet.map(memberEvent => {
                let x = {
                    ...memberEvent, id: memberEvent.event_id_
                }
                x.initial_date_ = x.initial_date_.split('T')[0]
                if(x.end_date_)x.end_date_= x.end_date_.split('T')[0]
                return x
            }))
        }
    },[memberEventsAttendanceGet])

const columns = [
    { field: 'event_id_', headerName: 'ID', width: 100 },
    { field: 'name_', headerName: t('name'), width: 180 },
    { field: 'state_', headerName: t('event_state'), width: 130 },
    { field: 'initial_date_', headerName: t('event_initial_date'), width: 150 },
    { field: 'end_date_', headerName: t('event_end_date'), width: 150 },
    {
        field: 'actions',
        type: 'actions',
        width: 110,
        getActions: (params) => [
            <GridActionsCellItem
            icon={<EventIcon />}
            label="Show Event"
            onClick={() => navigate(`/application/events/${params.id}`)}
            />
        ],
    },
];

  return (
    <>
      <MainCard title='My Events'sx={{height: '100%'}}>
      { loading ? 
            <Stack alignItems="center">
                <CircularProgress size='4rem'/>
            </Stack> : (
                <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                experimentalFeatures={{ newEditingApi: true }}
                /> 
            )}
      </MainCard> 
    </>
  )
}

export default MyEventsPage