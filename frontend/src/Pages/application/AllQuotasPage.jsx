import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuotas} from '../../store/actions/quotaActions'
import Box from '@mui/material/Box';
import Meta from '../../components/Meta';
import { useTranslation } from 'react-i18next'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import MainCard from '../../components/cards/MainCard';
import DateInputField from '../../components/multiStepForm/DateInputField';
import AnimateButton from '../../components/extended/AnimateButton'
import LoadingButton from '@mui/lab/LoadingButton'
import { Stack, CircularProgress, Grid, Alert} from '@mui/material'
import InputField from '../../components/multiStepForm/InputField';
import { Formik, Form } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import { Pagination } from '@mui/material'
import QuotaCreateDialog from '../../components/dialogs/QuotaCreateDialog';
import QuotaUpdateDialog from '../../components/dialogs/QuotaUpdateDialog';
import QuotaNotifyVerificationDialog from '../../components/dialogs/QuotaNotifyVerificationDialog'
import DropdownInputField from '../../components/multiStepForm/DropdownInputField';
import { QUOTAS_FETCH_RESET, QUOTA_CREATE_RESET, QUOTA_UPDATE_RESET } from '../../store/constants/quotaConstants';

const AllQuotasPage = () => {
    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()

    const [page, setPage] = useState(1);
    const quotasFetch = useSelector((state) => state.quotasFetch)
    const { loading, error, quotasGet } = quotasFetch
    const [rows, setRows] = useState([]);
    const [ searchState, setSearchState ] = useState({
        username_filter: "",
        email_filter: "",
        date_filter: "",
        limit: 10
    })
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [id, setId] = React.useState();
    const handleCloseUpdate = () => {setOpenUpdate(false); dispatch(getQuotas(searchState.username_filter,searchState.email_filter,searchState.date_filter,(page-1)*searchState.limit,searchState.limit))};
    const handleOpenUpdate = (id) => {
        setId(id)
        setOpenUpdate(true);
    }

    const [openSubmit, setOpenSubmit] = React.useState(false);
    const handleCloseSubmit = () => {setOpenSubmit(false); dispatch(getQuotas(searchState.username_filter, searchState.email_filter, searchState.date_filter, 0, searchState.limit)); dispatch({ type: QUOTA_CREATE_RESET })};
    const handleOpenSubmit = () => setOpenSubmit(true);

    const [openVerification, setOpenVerification] = React.useState(false);
    const handleCloseVerification = () => {setOpenVerification(false); setPage(1); dispatch(getQuotas(searchState.username_filter, searchState.email_filter, searchState.date_filter, 0, searchState.limit))};
    const handleOpenVerification = () => setOpenVerification(true);

    useEffect(() => {
        dispatch(getQuotas(searchState.username_filter, searchState.email_filter, searchState.date_filter, 0, searchState.limit))
        return () => {
            dispatch({ type: QUOTAS_FETCH_RESET })
            dispatch({ type: QUOTA_CREATE_RESET })
            dispatch({ type: QUOTA_UPDATE_RESET })
        }
    }, [])

    useEffect(() => {
        if(quotasGet){
            setRows(quotasGet.quotas.map(quota => {
                let x = {
                    ...quota, id: quota.id_
                }
                x.date_ = x.date_.split('T')[0]
                if(x.payment_date_)x.payment_date_= x.payment_date_.split('T')[0]
                return x
            }))
        }
    },[quotasGet])

    const searchHandler = async(values) => {
        const new_values = values
        // not the most correct way to do but for now works 03/06/2022
        if(values.date_filter && values.date_filter.length === undefined) {
            let day = values.date_filter.getDate()
            let month = values.date_filter.getMonth() + 1
            let year = values.date_filter.getFullYear()
            const p_date = `${year}-${month}-${day}`
            new_values.date_filter = p_date
        }
        setSearchState(new_values)
        setPage(1)
        setRows([])
        
        dispatch(getQuotas(new_values.username_filter,new_values.email_filter,new_values.date_filter,0,new_values.limit))
    }

    const changePageHandler = (event, value) => {
        setPage(value)
        dispatch(getQuotas(searchState.username_filter, searchState.email_filter, searchState.date_filter, (value-1)*searchState.limit, searchState.limit))
    }

    const columns = [
        { field: 'member_id_', headerAlign: "center", headerName: t('member_id'),align:'center', width: 120 },
        { field: 'username_', headerAlign: "center",headerName: t('username'),align:'center', width: 140 },
        { field: 'email_',headerAlign: "center", headerName: "Email",align:'center', width: 170 },
        { field: 'iban_', headerAlign: "center",headerName: 'IBAN',align:'center', width: 220},
        { field: 'phone_number_',headerAlign: "center", headerName: t('candidates_phone_number'), align:'center',width: 150 },
        { field: 'date_',headerAlign: "center", headerName: t('date'), align:'center',width: 170 },
        { field: 'payment_date_',headerAlign: "center", headerName: t('payment_date'), align:'center',width: 170 },
        { field: 'quota_value_',headerAlign: "center", headerName: t('quota_value'), align:'center',width: 170 },
        {
            field: 'actions',
            headerName: t('actions'),
            type: 'actions',
            width: 110,
            getActions: (params) => [
                <GridActionsCellItem
                icon={<CreditScoreIcon />}
                label="Show Quota"
                onClick={() => handleOpenUpdate(params.id)}
                disabled={params.row.payment_date_ !== null}
                />
            ],
        },
    ];


  return (
    <>
        <Meta title={t('all_quotas_page_title')}/>
        <QuotaUpdateDialog
            open={openUpdate}
            closeHandler={handleCloseUpdate}
            id={id}
        />
        <QuotaCreateDialog
            open={openSubmit}
            closeHandler={handleCloseSubmit}
        />
        <QuotaNotifyVerificationDialog
            open={openVerification}
            closeHandler={handleCloseVerification}
        />
        <MainCard title={t('Quotas')}sx={{height: '100%'}}>
            { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error" onClose={() => dispatch({ type: QUOTAS_FETCH_RESET })}>{t(error)}</Alert></Box> }
            <Box
                sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 1,
                gridTemplateRows: 'auto',
                gridTemplateAreas: `". . . ."
                "search search search create"
                ". . . ."`,
                }}
            >
            <Box gridArea={'search'}>
            <Formik
                    initialValues={searchState}
                    enableReinitialize={true}
                    onSubmit={values => searchHandler(values)}
                >
                {formik => (
                    <Form>
                        <Grid container spacing={2} direction="row" alignItems={'center'} >
                            <Grid item>
                                <InputField name='username_filter' label={t('sign_up_username')} type='text'></InputField>
                            </Grid>
                            <Grid item>
                                <InputField name='email_filter' label={t('sign_up_email')} type='text' ></InputField>
                            </Grid>
                            <Grid item>
                                <DateInputField name='date_filter' label={t('date')}></DateInputField>
                            </Grid>
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
            </Box>
                <Box gridArea={'create'} alignItems={'center'} display={{md: 'flex', lg: 'flex'}}  justifyContent='flex-end' sx={{ mt: { xs: 14, md : 0, lg : 0 }}}>
                    <AnimateButton>
                        <LoadingButton
                            disableElevation
                            size="large"
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            onClick={() => {
                                handleOpenSubmit()
                            }}
                        >
                            {t('create')}
                        </LoadingButton>
                    </AnimateButton>
                    <AnimateButton>
                        <LoadingButton
                            sx={{ ml: {md: 1}}}
                            disableElevation
                            size="large"
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            onClick={() => {
                                handleOpenVerification()
                            }}
                        >
                            {t('Notify')}
                        </LoadingButton>
                    </AnimateButton>
                </Box> 
            </Box>
      { loading ? 
        <Stack alignItems="center">
            <CircularProgress size='4rem'/>
        </Stack> : (
        <>
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
        <Pagination sx={{ mt: 2 }} variant="outlined" shape='rounded' color="primary" count={Math.ceil(quotasGet.number_of_quotas / searchState.limit)} page={page} onChange={changePageHandler} showFirstButton showLastButton/>
        </>
      )}
      </MainCard> 
    </>
  )
}

export default AllQuotasPage