import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEvents, deleteEvent } from '../../store/actions/eventActions'

import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event'
import MainCard from '../../components/cards/MainCard';
import { red, blue , green } from "@mui/material/colors";
import Chip from '@mui/material/Chip';

const AllEventsPage = () => {
    const theme = useTheme();
    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()
    const eventsFetch = useSelector((state) => state.eventsFetch)
    const { loading, error, eventsGet } = eventsFetch
    const [rows, setRows] = useState([]);
    
    useEffect(() => {
            dispatch(getEvents())
    },[])

    useEffect(() => {
        if(eventsGet){
            setRows(eventsGet.map(event => {
                let x = {
                    ...event, id: event.id_
                }
                x.initial_date_ = x.initial_date_.split('T')[0]
                if(x.end_date_)x.end_date_= x.end_date_.split('T')[0]
                return x
            }))
        }
    },[eventsGet])

    
    const deleteEventHandle = React.useCallback(
      (id) => () => {
        setTimeout(() => {
            dispatch(deleteEvent(id))
            setRows((prevRows) => prevRows.filter(row => row.id !== id))
        });
      },
      [],
    );
  
    const showEventHandle = React.useCallback(
      (id) => () => {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === id ? { ...row, isAdmin: !row.isAdmin } : row,
          ),
        );
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

const columns = [
    { field: 'id_', headerName: "ID", headerAlign: "left", width: 100 },
    { field: 'name_', headerName: t('name'), headerAlign: "left", width: 150 },
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
            onClick={showEventHandle(params.id)}
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
      <MainCard title='Events'sx={{height: '100%'}}>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          experimentalFeatures={{ newEditingApi: true }}
        /> 
      </MainCard> 
    </>
  )
}

export default AllEventsPage