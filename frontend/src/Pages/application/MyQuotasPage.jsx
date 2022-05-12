import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMembersQuotas} from '../../store/actions/quotaActions'

import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SurfingIcon from '@mui/icons-material/Surfing';
import MainCard from '../../components/cards/MainCard';

const MyQuotasPage = () => {
    const theme = useTheme();
    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()
    const memberQuotasFetch = useSelector((state) => state.memberQuotaFetch)
    const { loading, error, memberQuotasGet } = memberQuotasFetch
    const [rows, setRows] = useState([]);
    let { id } = useParams()
    
    useEffect(() => {
        dispatch(getMembersQuotas(id))
    },[dispatch,id])

    useEffect(() => {
        if(memberQuotasGet){
            setRows(memberQuotasGet.map(quota => {
                let x = {
                    ...quota, id: quota.id_
                }
                x.date_ = x.date_.split('T')[0]
                if(x.payment_date_)x.payment_date_= x.payment_date_.split('T')[0]
                return x
            }))
        }
    },[memberQuotasGet,dispatch])

const columns = [
    { field: 'date_', headerName: t('date'), width: 100 },
    { field: 'payment_date_', headerName: t('payment_date'), width: 130 },
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