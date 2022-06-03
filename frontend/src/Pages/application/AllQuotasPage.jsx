import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuotas, updateQuota, createQuota} from '../../store/actions/quotaActions'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';
import { parse, isDate } from "date-fns";

import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import MainCard from '../../components/cards/MainCard';
import DateInputField from '../../components/multiStepForm/DateInputField';
import AnimateButton from '../../components/extended/AnimateButton'
import LoadingButton from '@mui/lab/LoadingButton'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { Stack, CircularProgress, Grid, Alert, Divider} from '@mui/material'
import InputField from '../../components/multiStepForm/InputField';
import { Formik, Form } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import SubCard from '../../components/cards/SubCard'
import { Pagination } from '@mui/material'

const AllQuotasPage = () => {
    const theme = useTheme();
    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()
    const quotasFetch = useSelector((state) => state.quotasFetch)
    const { loading, error, quotasGet } = quotasFetch
    const [rows, setRows] = useState([]);

    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [id, setId] = React.useState();
    const handleCloseUpdate = () => setOpenUpdate(false);

    const [openSubmit, setOpenSubmit] = React.useState(false);
    const handleCloseSubmit = () => setOpenSubmit(false);
    const handleOpenSubmit = () => setOpenSubmit(true);

    const typesFetch = useSelector((state) => state.typesFetch)
    const { loading: loadingTypes, error: errorTypes, typesGet } = typesFetch

    const handleOpenUpdate = (id) => {
        setId(id)
        setOpenUpdate(true);
    }

    const [page, setPage] = useState(1);
    const limit = 5

    const [ searchState, setSearchState ] = useState({
        username_filter: "",
        email_filter: "",
        date_filter: ""
    })
    
    useEffect(() => {
        dispatch(getQuotas(searchState.username_filter, searchState.email_filter, searchState.date_filter, 0, limit))
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

    const updateQuotaHandle = async(values) => {
        let date = formatDate(values.payment_date)
        dispatch(updateQuota(date, id))
        dispatch(getQuotas(searchState.username_filter,searchState.email_filter,searchState.date_filter,0,limit)) //TODO toBe changed
        handleCloseUpdate()
    }

    const handleSubmitCreate = async (values) => {
        let date = formatDate(values.date)
        dispatch(createQuota(date))
        dispatch(getQuotas(searchState.username_filter,searchState.email_filter,searchState.date_filter,0,limit))
        handleCloseSubmit()
    }

    function formatDate(date) {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();
	
		if (month.length < 2) 
			month = '0' + month;
		if (day.length < 2) 
			day = '0' + day;
	
		return [year, month, day].join('-');
	}

    const parseDate = (originalValue) => {
        let parsedDate = isDate(originalValue)
            ? originalValue
            : parse(originalValue, "yyyy-MM-dd", new Date())

        return parsedDate
    }

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
        
        dispatch(getQuotas(new_values.username_filter,new_values.email_filter,new_values.date_filter,0,limit))
    }

    const changePageHandler = (event, value) => {
        setPage(value)
        dispatch(getQuotas(searchState.username_filter, searchState.email_filter, searchState.date_filter, (value-1)*limit, limit))
    }

const columns = [
    { field: 'member_id_', headerName: t('member_id'), width: 120 },
    { field: 'username_', headerName: t('username'), width: 140 },
    { field: 'email_', headerName: "Email", width: 170 },
    { field: 'iban_', headerName: 'IBAN', width: 220},
    { field: 'phone_number_', headerName: t('candidates_phone_number'), width: 150 },
    { field: 'date_', headerName: t('date'), width: 170 },
    { field: 'payment_date_', headerName: t('payment_date'), width: 170 },
    {
        field: 'actions',
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
    <Dialog
            fullWidth={true}
            open={openUpdate}
            onClose={handleCloseUpdate}
        >
            <Typography sx={{pl: 5, pt: 5}}  variant="h2" component="h2">
                {t('payment_date')}
            </Typography>
            <DialogContent>
                <Box
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    m: 'auto',
                    width: 'fit-content',
                    }}
                >
                    <Formik
                        initialValues={{
                            payment_date: ''
                        }}
                        validationSchema={Yup.object().shape({
                            payment_date: Yup.date().transform(parseDate).typeError(t('sign_up_valid_date')).required(t('sign_up_birth_date_mandatory')),
                        })}
                        onSubmit={updateQuotaHandle}
                    >
                    {Formik => (
                        <Form>
                            <DateInputField name='payment_date' label={t('payment_date')}></DateInputField>
                            <AnimateButton>
                                <LoadingButton
                                    disableElevation
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    loading = {loading}
                                >
                                    {t('confirm')}
                                </LoadingButton>
                            </AnimateButton>
                        </Form>
                    )}
                    </Formik>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseUpdate}>Close</Button>
            </DialogActions>
        </Dialog>
        <Dialog
            fullWidth={true}
            open={openSubmit}
            onClose={handleCloseSubmit}
        >
            <Typography sx={{pl: 5, pt: 5}}  variant="h2" component="h2">
                {t('date')}
            </Typography>
            <DialogContent>
                <Box
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    m: 'auto',
                    width: 'fit-content',
                    }}
                >
                    <Formik
                        initialValues={{
                            date: ''
                        }}
                        validationSchema={Yup.object().shape({
                            date: Yup.date().transform(parseDate).typeError(t('sign_up_valid_date')).required(t('sign_up_birth_date_mandatory')),
                        })}
                        onSubmit={handleSubmitCreate}
                    >
                    {Formik => (
                        <Form>
                            <DateInputField name='date' label={t('date')}></DateInputField>
                            <AnimateButton>
                                <LoadingButton
                                    disableElevation
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    loading = {loading}
                                >
                                    {t('confirm')}
                                </LoadingButton>
                            </AnimateButton>
                        </Form>
                    )}
                    </Formik>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseSubmit}>Close</Button>
            </DialogActions>
        </Dialog>
        <MainCard title={t('Quotas')}sx={{height: '100%'}}>
      { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> }
            { errorTypes && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(errorTypes)}</Alert></Box> }
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
                                        {t('Search')}
                                    </LoadingButton>
                                </AnimateButton>
                            </Grid>    
                        </Grid>
                    </Form>
                )}
            </Formik>
            </Box>
                <Box gridArea={'create'} alignItems={'center'} display='flex' justifyContent='flex-end'>
                    <AnimateButton>
                        <LoadingButton
                            disableElevation
                            size="large"
                            variant="outlined"
                            color="secondary"
                            onClick={() => {
                                handleOpenSubmit()
                            }}
                        >
                            {t('create')}
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
            pageSize={limit}
            hideFooter={true}
            onPageChange={changePageHandler}
            sx={{
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "rgba(219, 219, 219, 0.5)"
                }
            }}
        />
        <Pagination sx={{ mt: 2 }} variant="outlined" shape='rounded' color="primary" count={Math.ceil(quotasGet.number_of_quotas / limit)} page={page} onChange={changePageHandler} showFirstButton showLastButton/>
        </>
      )}
      </MainCard> 
    </>
  )
}

export default AllQuotasPage