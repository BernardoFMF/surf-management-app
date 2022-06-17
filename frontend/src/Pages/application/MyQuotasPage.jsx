import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMembersQuotas} from '../../store/actions/quotaActions'

import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import MainCard from '../../components/cards/MainCard';
import { Pagination, Alert , Box, Stack, CircularProgress} from '@mui/material';

const MyQuotasPage = () => {
    const theme = useTheme();
    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()
    const memberQuotasFetch = useSelector((state) => state.memberQuotaFetch)
    const { loading, error, memberQuotasGet } = memberQuotasFetch
    const [rows, setRows] = useState([]);
    let { id } = useParams()
    
    useEffect(() => {
        dispatch(getMembersQuotas(id,0,limit))
    },[dispatch,id])

    const [page, setPage] = useState(1);
    const limit = 5

    useEffect(() => {
        if(memberQuotasGet){
            setRows(memberQuotasGet.quotas.map(quota => {
                let x = {
                    ...quota, id: quota.id_
                }
                x.date_ = x.date_.split('T')[0]
                if(x.payment_date_)x.payment_date_= x.payment_date_.split('T')[0]
                return x
            }))
        }
    },[memberQuotasGet,dispatch])

    const changePageHandler = (event, value) => {
        setPage(value)
        dispatch(getMembersQuotas(id, (value-1)*limit, limit))
    }

    const columns = [
        { field: 'date_', headerAlign: "center", headerName: t('date'), align:'center', width: 120 },
        { field: 'payment_date_', headerAlign: "center",headerName: t('payment_date'),align:'center', width: 170 },
        { field: 'quota_value_', headerAlign: "center",headerName: t('quota_value'),align:'center', width: 170 }
    ];

  return (
    <>
      <MainCard title={t('my_quotas')} sx={{height: '100%'}}>
      { loading ? 
        <Stack alignItems="center">
            <CircularProgress size='4rem'/>
        </Stack> : (
        <>
            { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> }
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
            <Pagination sx={{ mt: 2 }} variant="outlined" shape='rounded' color="primary" count={Math.ceil(memberQuotasGet.number_of_quotas / limit)} page={page} onChange={changePageHandler} showFirstButton showLastButton/>
        </>)}

      </MainCard> 
    </>
  )
}

export default MyQuotasPage