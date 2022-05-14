import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersSport } from  '../../store/actions/userActions'
import { useParams } from 'react-router-dom'

import { useTranslation } from 'react-i18next'
import { DataGrid } from '@mui/x-data-grid'
import MainCard from '../../components/cards/MainCard'
import { Stack, CircularProgress} from '@mui/material'
import { useNavigate } from 'react-router';

const SportPage = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let { id } = useParams()
    const usersSportFetch = useSelector((state) => state.usersSportFetch)
    const { loading, error, usersSportGet } = usersSportFetch
    const [rows, setRows] = useState([]);
    
    useEffect(() => { 
        dispatch(getUsersSport(id))
    },[])

    useEffect(() => {
        if(usersSportGet){
            setRows(usersSportGet.map(sport => {
                let x = {
                    ...sport, id: sport.user_id_
                }
                return x
            }))
        }
    },[usersSportGet,dispatch])

const columns = [
    { field: 'username_', headerName: t('username'), width: 150 },
    { field: 'type_', headerName: 'Position(s)', width: 170 },
    { field: 'fed_number_', headerName: t('fed_number_'), width: 150 },
    { field: 'fed_id_', headerName: t('fed_id_'), width: 130 },
    { field: 'fed_name_', headerName: t('fed_name_'), width: 250 },
    { field: 'years_federated_', headerName: t('years_federated_'), width: 150 },
    { field: 'is_absent_', headerName: t('is_absent_'), type: 'boolean',  width: 130 },
];

  return (
    <>
      
      
      { loading ? 
       <MainCard title='' sx={{height: '100%'}}>
            <Stack alignItems="center">
                <CircularProgress size='4rem'/>
            </Stack>
        </MainCard> : (
        <MainCard title={usersSportGet[0] ? usersSportGet[0].name_ : ''} sx={{height: '100%'}}>
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
        )}
    
    </>
  )
}

export default SportPage