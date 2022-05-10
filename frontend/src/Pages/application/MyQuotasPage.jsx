import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSports, deleteSport } from '../../store/actions/sportActions'

import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SurfingIcon from '@mui/icons-material/Surfing';
import MainCard from '../../components/cards/MainCard';

const MyQuotasPage = () => {
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

const columns = [
    { field: 'date_', headerName: t('date'), width: 100 },
    { field: 'payment_date_', type: 'boolean', headerName: t('payment_date'), width: 130 },
];


  return (
    <>
      <MainCard title='MyQuotas'sx={{height: '100%'}}>
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

export default MyQuotasPage