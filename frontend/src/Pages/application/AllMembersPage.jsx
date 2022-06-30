import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getUsers } from '../../store/actions/userActions'
import { exportUsersCSV } from '../../store/actions/exportActions'
import { Form, Formik } from 'formik';
import { Grid, Stack, Pagination, CircularProgress, Alert, Box} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { DataGrid, GridActionsCellItem} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MainCard from '../../components/cards/MainCard';
import { useNavigate } from 'react-router';
import SearchIcon from '@mui/icons-material/Search';
import InputField from '../../components/multiStepForm/InputField';
import AnimateButton from '../../components/extended/AnimateButton'
import LoadingButton from '@mui/lab/LoadingButton'
import UserCreateDialog from '../../components/dialogs/UserCreateDialog';
import { getTypes } from '../../store/actions/typeActions'
import DropdownInputField from '../../components/multiStepForm/DropdownInputField';
import ExportCSV from '../../components/ExportCSV'
import CheckInputField from '../../components/multiStepForm/CheckInputField';

const AllMembersPage = () => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const exportU = useSelector((state) => state.exportUsersCSV)
    const { exportUsers } = exportU
    const [data, setData] = useState([]);


    const userFetch = useSelector((state) => state.usersFetch)
    const { loading, error, usersGet } = userFetch

    const userPost = useSelector((state) => state.userPost)
    const { posted } = userPost

    const typesFetch = useSelector((state) => state.typesFetch)
    const { loading: loadingTypes, error: errorTypes } = typesFetch

    const [rows, setRows] = useState([]);

    const [ searchState, setSearchState ] = useState({
        username_filter: "",
        name_filter: "",
        email_filter: "",
        toggle_filter: false,
        limit: 10
    })

    const [open, setOpen] = useState(false);
    const handleClose = () => {setOpen(false); getUsers(searchState.username_filter, searchState.name_filter, searchState.email_filter, searchState.toggle_filter, 0, searchState.limit)};
    const handleOpen = () => setOpen(true);


   
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (posted) {
            setSearchState({
                username_filter: "",
                name_filter: "",
                email_filter: "",
                limit: 10
            })
        }
    }, [posted])
    
    useEffect(() => {
        dispatch(getUsers(searchState.username_filter, searchState.name_filter, searchState.email_filter, searchState.toggle_filter, 0, searchState.limit))
        dispatch(getTypes('user'))
        dispatch(exportUsersCSV())
    }, [])

    useEffect(() => {
        if(usersGet){
            setRows(usersGet.users.map(user => {
                let x = {
                    ...user, id: user.member_id_
                }
                return x
            }))
        }
    },[usersGet])

    useEffect(() => {
        if(exportUsers){
            setData(exportUsers.filter(user => user.is_admin_ === false))
        }
    },[exportUsers])

    const deleteUserHandle = React.useCallback(
      (id) => () => {
        setTimeout(() => {
            dispatch(deleteUser(id))
            setRows((prevRows) => prevRows.filter(row => {
                if(row.id === id) row.is_deleted_ = true
                return row
            }))
        });
      },
      [],
    )

    const searchHandler = async(values) => {
        setSearchState(values)
        setPage(1)
        setRows([])
        dispatch(getUsers(values.username_filter,values.name_filter,values.email_filter, values.toggle_filter,0,values.limit))
    }

    const changePageHandler = (event, value) => {
        setPage(value)
        dispatch(getUsers(searchState.username_filter, searchState.name_filter, searchState.email_filter, searchState.toggle_filter, (value-1)*searchState.limit, searchState.limit))
    }

    const columns = [
        { field: 'member_id_', headerName: 'ID', width: 40 ,headerAlign: "center",align:'center'},
        { field: 'username_', headerName: t('candidates_username'), width: 200 ,headerAlign: "center",align:'center'},
        { field: 'full_name_', headerName: t('full_name'), width: 180 ,headerAlign: "center",align:'center'},
        { field: 'email_', headerName: 'Email', width: 170,headerAlign: "center",align:'center'},
        { field: 'iban_', headerName: 'IBAN', width: 220,headerAlign: "center",align:'center'},
        { field: 'gender_', headerName: t('gender'), width: 110 ,headerAlign: "center",align:'center'},    
        { field: 'nationality_', headerName: t('nationality'), width: 130 ,headerAlign: "center",align:'center'},
        { field: 'birth_date_', headerName: t('birth_date'), width: 150 ,headerAlign: "center",align:'center'},
        { field: 'member_type_', headerName: t('member_type'), width: 130 ,headerAlign: "center",align:'center'},
        { field: 'enrollment_date_', headerName: t('enrollment_date'), width: 150 ,headerAlign: "center",align:'center'},
        { field: 'has_debt_', headerName: t('has_debt_'), width: 110 , type: 'boolean',headerAlign: "center",align:'center'},
        { field: 'paid_enrollment_', headerName: t('paid_enrollment_'), width: 120, type: 'boolean' ,headerAlign: "center",align:'center'},
        { field: 'is_admin_', headerName: t('is_admin_'), width: 120 , type: 'boolean',headerAlign: "center",align:'center'},
        { field: 'is_deleted_', headerName: t('is_deleted_'), width: 120, type: 'boolean',headerAlign: "center",align:'center'},
        {
            field: 'actions',
            type: 'actions',
            headerName: t('actions'),
            width: 110,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<AccountCircleIcon />}
                    label="Show Profile"
                    onClick={() => navigate(`/application/members/${params.id}`)}
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={deleteUserHandle(params.id)}
                    disabled={params.row.is_deleted_ }
                />
            ],
        },
    ];


    const headers = [
        { key: 'member_id_', label: 'ID'},
        { key: 'username_', label: t('candidates_username')},
        { key: 'full_name_', label: t('full_name')},
        { key: 'email_', label: 'Email'},
        { key: 'iban_', label: 'IBAN'},
        { key: 'gender_', label: t('gender')},    
        { key: 'nationality_', label: t('nationality')},
        { key: 'birth_date_', label: t('birth_date')},
        { key: 'member_type_', label: t('member_type')},
        { key: 'enrollment_date_', label: t('enrollment_date')},
        { key: 'has_debt_', label: t('has_debt_')},
        { key: 'paid_enrollment_', label: t('paid_enrollment_')},
        { key: 'is_deleted_', label: t('is_deleted_')}
      ];
       
    const csvreport = {
        data: data,
        headers: headers,
        filename: 'club_users.csv'
    };

    return (
        <>
            <UserCreateDialog
                open={open}
                closeHandler={handleClose}
            />
            <MainCard title={t('all_users')} direction='ltr' sx={{height: '100%'}}>
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
                            scrollbarSize={20}
                            sx={{
                                "& .MuiDataGrid-columnHeaders": {
                                    backgroundColor: "rgba(219, 219, 219, 0.5)"
                                }
                            }}
                        />
                        <Pagination sx={{ mt: 2 }} variant="outlined" shape='rounded' color="primary" count={Math.ceil(usersGet.number_of_users / searchState.limit)} page={page} onChange={changePageHandler} showFirstButton showLastButton/>
                        <Grid sx={{ mt: 2 }} >
                            <ExportCSV csvreport={csvreport} exportText={t('export_users')} ></ExportCSV>
                        </Grid>
                    </>
                )}
            </MainCard> 
        </>
    )
}

export default AllMembersPage