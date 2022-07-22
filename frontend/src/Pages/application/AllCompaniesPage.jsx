import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCompany, getCompanies } from '../../store/actions/companyActions'
import BusinessIcon from '@mui/icons-material/Business';
import { Stack, CircularProgress, useMediaQuery } from '@mui/material'
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
import CompanyCreateDialog from '../../components/dialogs/CompanyCreateDialog';
import { useTheme } from '@mui/material/styles';
import DropdownInputField from '../../components/multiStepForm/DropdownInputField';
import ExportCSV from '../../components/ExportCSV'
import { exportCompaniesCSV } from '../../store/actions/exportActions'
import CheckInputField from '../../components/multiStepForm/CheckInputField';
import Meta from '../../components/Meta';
import { COMPANIES_FETCH_RESET, COMPANY_DELETE_RESET, COMPANY_POST_RESET } from '../../store/constants/companyConstants';
import { TYPES_FETCH_RESET } from '../../store/constants/typeConstants';
import { EXPORT_COMPANY_FETCH_RESET } from '../../store/constants/exportConstants';
import useLang from '../../hooks/useLang'

const AllCompaniesPage = () => {
    const theme = useTheme()
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))
    const {t} = useTranslation()
    const { lang } = useLang()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const exportC = useSelector((state) => state.exportCompaniesCSV)
    const { exportCompanies } = exportC
    const [data, setData] = useState([]);

    const companiesFetch = useSelector((state) => state.companiesFetch)
    const { loading, error, companiesGet } = companiesFetch

    const [rows, setRows] = useState([]);

    const [ searchState, setSearchState ] = useState({
      username_filter: "",
      name_filter: "",
      email_filter: "",
      toggle_filter: false,
      limit: 10
    })

    const typesFetch = useSelector((state) => state.typesFetch)
    const { loading: loadingTypes, error: errorTypes } = typesFetch

    const companyPost = useSelector((state) => state.companyPost)
    const { posted } = companyPost
    
    const [page, setPage] = useState(1);

    const [open, setOpen] = useState(false);
    const handleClose = () => {setOpen(false); setPage(1); dispatch({ type: COMPANY_POST_RESET }); dispatch(getCompanies(searchState.username_filter, searchState.name_filter, searchState.email_filter, searchState.toggle_filter, 0, searchState.limit))};
    const handleOpen = () => setOpen(true);

    useEffect(() => {
        if (posted) {
            setSearchState({
                username_filter: "",
                name_filter: "",
                email_filter: "",
                toggle_filter: false,
                limit: 10
            })
        }
    }, [posted])

    useEffect(() => {
        dispatch(getCompanies(searchState.username_filter, searchState.name_filter, searchState.email_filter,searchState.toggle_filter, 0, searchState.limit))
        dispatch(getTypes('company'))
        dispatch(exportCompaniesCSV())
        return () => {
            dispatch({ type: COMPANIES_FETCH_RESET })
            dispatch({ type: COMPANY_DELETE_RESET })
            dispatch({ type: TYPES_FETCH_RESET })
            dispatch({ type: EXPORT_COMPANY_FETCH_RESET })
        }
    }, [])

    const changePageHandler = (event, value) => {
        setPage(value)
        dispatch(getCompanies(searchState.username_filter, searchState.name_filter, searchState.email_filter,searchState.toggle_filter, (value-1)*searchState.limit, searchState.limit))
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
    }, [companiesGet])

    useEffect(() => {
        if(exportCompanies){
            setData(exportCompanies)
        }
    }, [exportCompanies])

    
    const deleteCompanyHandle = React.useCallback(
      (id) => () => {
        setTimeout(() => {
            dispatch(deleteCompany(id))
            setRows((prevRows) => prevRows.filter(row => {
                if(row.id === id) row.is_deleted_ = true
                return row
            }))
        });
      },
      [],
    );
  
    const searchHandler = async(values) => {
        setSearchState(values)
        setPage(1)
        setRows([])
        dispatch(getCompanies(values.username_filter,values.name_filter,values.email_filter,values.toggle_filter,0,values.limit))
    }

    const columns = [
        { field: 'member_id_', headerName: 'ID', width: 40 ,headerAlign: "center",align:'center'},
        { field: 'username_', headerName: t('username'), width: 140 ,headerAlign: "center",align:'center'},
        { field: 'name_', headerName: t('name'), width: 150,headerAlign: "center",align:'center' },
        { field: 'email_', headerName: 'Email', width: 170 ,headerAlign: "center",align:'center'},  
        { field: 'iban_', headerName: 'IBAN', width: 220,headerAlign: "center",align:'center'},  
        { field: 'nif_', headerName: 'NIF', width: 110 ,headerAlign: "center",align:'center'},
        { field: 'has_debt_', headerName: t('has_debt_'), type: 'boolean', width: 130 ,headerAlign: "center",align:'center'},
        { field: 'is_deleted_', headerName: t('is_deleted_'), type: 'boolean', width: 130 ,headerAlign: "center",align:'center'},
        {
            field: 'actions',
            type: 'actions',
            headerName: t('actions'),
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

    const headers = [
        { key: 'member_id_', label: 'ID'},
        { key: 'username_', label: t('candidates_username')},
        { key: 'name_', label: t('name')},
        { key: 'email_', label: 'Email'},
        { key: 'iban_', label: 'IBAN'},
        { key: 'nif_', label: 'NIF'},
        { key: 'has_debt_', label: t('has_debt_')},
        { key: 'is_deleted_', label: t('is_deleted_')}
    ];
    
    const csvreport = {
        data: data,
        headers: headers,
        filename: 'club_companies.csv'
    };

    return (
        <>
            <Meta title={t('all_companies_page_title')}/>
            <CompanyCreateDialog
                open={open}
                closeHandler={handleClose}        
            />
            <MainCard title={t('all_companies')} sx={{height: '100%'}}>
                { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error" onClose={() => dispatch({ type: COMPANIES_FETCH_RESET })}>{t(error)}</Alert></Box> }
                { errorTypes && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error" onClose={() => dispatch({ type: TYPES_FETCH_RESET })}>{t(errorTypes)}</Alert></Box> }
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
                                    <Grid container spacing={2} direction="row" alignItems={'center'}>
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
                                            <CheckInputField name='toggle_filter' label={t('has_debt_')} type='boolean'></CheckInputField>
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
                    <Box gridArea={'create'} alignItems={'center'} display={{md: 'flex', lg: 'flex'}} justifyContent='flex-end' sx={{ mt: { xs: 14, md : 0, lg : 0 }}}>
                        <AnimateButton>
                            <LoadingButton
                                disableElevation
                                size="large"
                                variant="outlined"
                                color="secondary"
                                onClick={() => {
                                    handleOpen()
                                }}
                            >
                                {t('create')}
                            </LoadingButton>
                        </AnimateButton>
                    </Box>
                </Box>
                { loading || loadingTypes ? 
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
                            localeText={lang}
                            sx={{
                                "& .MuiDataGrid-columnHeaders": {
                                    backgroundColor: "rgba(219, 219, 219, 0.5)"
                                }
                            }}
                        />
                        <Pagination sx={{ mt: 2 }} variant="outlined" shape='rounded' color="primary" count={Math.ceil(companiesGet.number_of_companies / searchState.limit)} page={page} onChange={changePageHandler} showFirstButton showLastButton/>
                        <Grid container sx={{ mt: 2 }} >
                            <Grid item>
                                <ExportCSV csvreport={csvreport} exportText={t('export_companies')} ></ExportCSV>
                            </Grid>
                        </Grid>
                    </>
                )}
        </MainCard> 
    </>
  )
}

export default AllCompaniesPage