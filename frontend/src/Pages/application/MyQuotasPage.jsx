import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMembersQuotas} from '../../store/actions/quotaActions'
import Meta from '../../components/Meta';
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import MainCard from '../../components/cards/MainCard';
import { Grid, Pagination, Alert , Box, Stack, CircularProgress} from '@mui/material';
import DropdownInputField from '../../components/multiStepForm/DropdownInputField'
import AnimateButton from '../../components/extended/AnimateButton'
import LoadingButton from '@mui/lab/LoadingButton'
import SearchIcon from '@mui/icons-material/Search';
import { Form, Formik } from 'formik';
import { MEMBER_QUOTAS_FETCH_RESET } from '../../store/constants/quotaConstants';

const MyQuotasPage = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const memberQuotasFetch = useSelector((state) => state.memberQuotaFetch)
    const { loading, error, memberQuotasGet } = memberQuotasFetch
    const [rows, setRows] = useState([]);
    let { id } = useParams()
    
    useEffect(() => {
        dispatch(getMembersQuotas(id,0,searchState.limit))
        return () => {
            dispatch({ type: MEMBER_QUOTAS_FETCH_RESET })
        }
    }, [])

    const [page, setPage] = useState(1);
    const [ searchState, setSearchState ] = useState({
        limit: 10
    })

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
        dispatch(getMembersQuotas(id, (value-1)*searchState.limit, searchState.limit))
    }
    
    const searchHandler = async(values) => {
        setSearchState(values)
        setPage(1)
        setRows([])
        dispatch(getMembersQuotas(id, 0, values.limit))
    }

    const columns = [
        { field: 'date_', headerAlign: "center", headerName: t('date'), align:'center', width: 120 },
        { field: 'payment_date_', headerAlign: "center",headerName: t('payment_date'),align:'center', width: 170 },
        { field: 'quota_value_', headerAlign: "center",headerName: t('quota_value'),align:'center', width: 170 }
    ];

  return (
    <>
        <Meta title={t('my_quotas_page_title')}/>
      <MainCard title={t('my_quotas')} sx={{height: '100%'}}>
      { loading ? 
        <Stack alignItems="center">
            <CircularProgress size='4rem'/>
        </Stack> : (
        <>
            { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error" onClose={() => dispatch({ type: MEMBER_QUOTAS_FETCH_RESET })}>{t(error)}</Alert></Box> }
            <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                pageSize={searchState.limit}
                hideFooter={true}
                onPageChange={changePageHandler}
                sx={{
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "rgba(219, 219, 219, 0.5)"
                    }
                }}
            /> 
            <Grid container>
                <Grid item>
                    <Pagination sx={{ mt: 2 }} variant="outlined" shape='rounded' color="primary" count={Math.ceil(memberQuotasGet.number_of_quotas / searchState.limit)} page={page} onChange={changePageHandler} showFirstButton showLastButton/>
                </Grid>
                <Grid item>
                    <Formik
                        initialValues={searchState}
                        enableReinitialize={true}
                        onSubmit={values => searchHandler(values)}
                    >
                        {formik => (
                            <Form>
                                <Grid container spacing={2} direction="row" alignItems={'center'} sx={{ml : 0.5}}>
                                    <Grid item>
                                        <DropdownInputField name='limit' label={t('rows')} options={[10, 15, 20]} ></DropdownInputField>
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
                </Grid>
            </Grid>
            
        </>)}

      </MainCard> 
    </>
  )
}

export default MyQuotasPage