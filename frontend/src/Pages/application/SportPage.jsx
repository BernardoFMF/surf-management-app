import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersSport } from  '../../store/actions/userActions'
import { useParams } from 'react-router-dom'

import { useTranslation } from 'react-i18next'
import { DataGrid } from '@mui/x-data-grid'
import MainCard from '../../components/cards/MainCard'
import { Stack, CircularProgress, Box, Alert, Pagination } from '@mui/material'

const SportPage = () => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    let { id } = useParams()
    const usersSportFetch = useSelector((state) => state.usersSportFetch)
    const { loading, error, usersSportGet } = usersSportFetch
    const [rows, setRows] = useState([]);
    
    useEffect(() => { 
        dispatch(getUsersSport(id, 0, limit))
    },[])

    const [page, setPage] = useState(1);
    const limit = 5

    useEffect(() => {
        if(usersSportGet){
            setRows(usersSportGet.sports.map(sport => {
                let x = {
                    ...sport, id: sport.user_id_
                }
                return x
            }))
        }
    },[usersSportGet,dispatch])

    const changePageHandler = (event, value) => {
        setPage(value)
        dispatch(getUsersSport(id, (value-1)*limit, limit))
    }

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
        <MainCard title={usersSportGet && usersSportGet.sports.length != 0 && usersSportGet.sports[0] ? usersSportGet.sports[0].name_ : ''} sx={{height: '100%'}}>
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
                <Pagination sx={{ mt: 2 }} variant="outlined" shape='rounded' color="primary" count={Math.ceil(usersSportGet.number_of_sports / limit)} page={page} onChange={changePageHandler} showFirstButton showLastButton/>
            </>
            )
        }
        </MainCard> 
    </>
  )
}

export default SportPage