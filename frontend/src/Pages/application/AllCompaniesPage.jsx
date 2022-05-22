import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCompany, getCompanies } from '../../store/actions/companyActions'
import BusinessIcon from '@mui/icons-material/Business';
import {  Stack, CircularProgress} from '@mui/material'
import { getTypes } from '../../store/actions/typeActions'
import { useTranslation } from 'react-i18next'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import MainCard from '../../components/cards/MainCard';
import { Form, Formik } from 'formik';
import InputField from '../../components/multiStepForm/InputField';
import Box from '@mui/material/Box';
import { Grid, Alert} from '@mui/material'
import AnimateButton from '../../components/extended/AnimateButton'
import LoadingButton from '@mui/lab/LoadingButton'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router';
import { Pagination } from '@mui/material';

const AllCompaniesPage = () => {

    const {t} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const companiesFetch = useSelector((state) => state.companiesFetch)
    const { loading, error, companiesGet } = companiesFetch

    const [rows, setRows] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    const [ searchState, setSearchState ] = useState({
      username_filter: "",
      name_filter: "",
      email_filter: ""
  })

  const typesFetch = useSelector((state) => state.typesFetch)
    const { loading: loadingTypes, error: errorTypes, typesGet } = typesFetch
  
  const [page, setPage] = useState(1);
  const limit = 5

    useEffect(() => {
        dispatch(getCompanies(searchState.username_filter, searchState.name_filter, searchState.email_filter, 0, limit))
        dispatch(getTypes())
    }, [])

  const changePageHandler = (event, value) => {
    setPage(value)
    dispatch(getCompanies(searchState.username_filter, searchState.name_filter, searchState.email_filter, (value-1)*limit, limit))
}

    useEffect(() => {
        if(companiesGet){
            setRows(companiesGet.companies.map(company => {
                let x = {
                    ...company, id: company.member_id_
                }
                return x
            }))
        }
    },[companiesGet])

    
    const deleteCompanyHandle = React.useCallback(
      (id) => () => {
        setTimeout(() => {
            dispatch(deleteCompany(id))
            setRows((prevRows) => prevRows.filter(row => row.id !== id))
        });
      },
      [],
    );
  
    const searchHandler = async(values) => {
      setSearchState(values)
      setPage(1)
      setRows([])
      dispatch(getCompanies(values.username_filter,values.name_filter,values.email_filter,0,limit))
    }

const columns = [
    { field: 'member_id_', headerName: 'ID', width: 40 },
    { field: 'username_', headerName: t('username'), width: 140 },
    { field: 'name_', headerName: t('name'), width: 150 },
    { field: 'email_', headerName: 'Email', width: 170 },    
    { field: 'nif_', headerName: 'NIF', width: 110 },
    { field: 'has_debt_', headerName: t('has_debt_'), type: 'boolean', width: 130 },
    { field: 'is_deleted_', headerName: t('is_deleted_'), type: 'boolean', width: 130 },
    {
        field: 'actions',
        type: 'actions',
        width: 110,
        getActions: (params) => [
          <GridActionsCellItem
          icon={<BusinessIcon />}
          label="Show Profile"
          onClick={() => navigate(`/application/members/${params.id}`)}
          />,
            <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteCompanyHandle(params.id)}
            disabled={params.row.is_deleted_}
            />
        ],
    },
];


  return (
    <>
      <MainCard title={t('companies')}sx={{height: '100%'}}>
      { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> }
            { errorTypes && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(errorTypes)}</Alert></Box> }
            <Formik
                    initialValues={searchState}
                    enableReinitialize={true}
                    onSubmit={values => searchHandler(values)}
                >
                {formik => (
                    <Form>
                        <Grid container spacing={2} direction="row" alignItems={'center'} sx={{ mb: 2}}>
                            <Grid item>
                                <InputField name='username_filter' label={t('sign_up_username')} type='text'></InputField>
                            </Grid>
                            <Grid item>
                                <InputField name='name_filter' label={t('sign_up_full_name')} type='text' ></InputField>
                            </Grid>
                            <Grid item>
                                <InputField name='email_filter' label={t('sign_up_email')} type='text' ></InputField>
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
        <Pagination sx={{ mt: 2 }} variant="outlined" shape='rounded' color="primary" count={Math.ceil(companiesGet.number_of_companies / limit)} page={page} onChange={changePageHandler} showFirstButton showLastButton/>
        </>
      )}
      </MainCard> 
    </>
  )
}

export default AllCompaniesPage