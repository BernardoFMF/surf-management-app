import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserSports} from '../../store/actions/userActions'

import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SurfingIcon from '@mui/icons-material/Surfing';
import MainCard from '../../components/cards/MainCard';
import { boolean } from 'yup/lib/locale';

const MySportsPage = () => {
    const theme = useTheme();
    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()
    const userSportsFetch = useSelector((state) => state.userSportsFetch)
    const { loading, error, userSportsGet } = userSportsFetch
    const [rows, setRows] = useState([]);
    let { id } = useParams()
    
    useEffect(() => {
        dispatch(getUserSports(id))
    },[dispatch,id])

    useEffect(() => {
        if(userSportsGet){
            setRows(userSportsGet.map(sport => {
                let x = {
                    ...sport, id: sport.sport_id_
                }
                return x
            }))
        }
    },[userSportsGet,dispatch])

const columns = [
    { field: 'name_', headerName: t('name'), width: 150 },
    { field: 'type_', headerName: t('type'), width: 150 },
    { field: 'fed_number_', headerName: t('fed_number_'), width: 160 },
    { field: 'fed_id_', headerName: t('fed_id_'), width: 130 },
    { field: 'fed_name_', headerName: t('fed_name_'), width: 290 },
    { field: 'years_federated_', headerName: t('years_federated_'), width: 150 },
    { field: 'is_absent_', headerName: t('is_absent_'), type: 'boolean', width: 130 },
];

  return (
    <>
      <MainCard title={t('my_sports')} sx={{height: '100%'}}>
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

export default MySportsPage