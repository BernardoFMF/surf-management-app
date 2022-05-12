import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSports, deleteSport } from '../../store/actions/sportActions'

import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SurfingIcon from '@mui/icons-material/Surfing';
import MainCard from '../../components/cards/MainCard';

const AllSportsPage = () => {
    const theme = useTheme();
    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()
    const sportsFetch = useSelector((state) => state.sportsFetch)
    const { loading, error, sportsGet } = sportsFetch
    const [rows, setRows] = useState([]);
    
    useEffect(() => {
            dispatch(getSports())
    },[])

    useEffect(() => {
        if(sportsGet){
            console.log(sportsGet)
            setRows(sportsGet.map(sport => {
                let x = {
                    ...sport, id: sport.id_
                }
                return x
            }))
        }
    },[sportsGet])

    
    const deleteSportHandle = React.useCallback(
      (id) => () => {
        setTimeout(() => {
            dispatch(deleteSport(id))
            setRows((prevRows) => prevRows.filter(row => row.id !== id))
        });
      },
      [],
    );
  
    const showProfileHandle = React.useCallback(
      (id) => () => {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === id ? { ...row, isAdmin: !row.isAdmin } : row,
          ),
        );
      },
      [],
    );

const columns = [
    { field: 'name_', headerName: t('name'), width: 100 },
    { field: 'is_deleted_', type: 'boolean', headerName: t('is_deleted'), width: 130 },
    { field: 'practitioners_', headerName: t('practitioners'), width: 170 },
    {
        field: 'actions',
        type: 'actions',
        width: 110,
        getActions: (params) => [
            <GridActionsCellItem
            icon={<SurfingIcon />}
            label="Show Sport"
            onClick={showProfileHandle(params.id)}
            />,
            <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete Sport"
            onClick={deleteSportHandle(params.id)}
            disabled={params.row.is_deleted_}
            />
        ],
    },
];


  return (
    <>
      <MainCard title='Sports'sx={{height: '100%'}}>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          experimentalFeatures={{ newEditingApi: true }}
        /> 
      </MainCard> 
    </>
  )
}

export default AllSportsPage