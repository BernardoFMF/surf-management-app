import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getUsers } from '../../store/actions/userActions'
import { Form, Formik } from 'formik';
import { Grid, Stack, Pagination, CircularProgress, Alert, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { DataGrid, GridActionsCellItem, ptBR } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MainCard from '../../components/cards/MainCard';
import { useNavigate } from 'react-router';
import SearchIcon from '@mui/icons-material/Search';
import InputField from '../../components/multiStepForm/InputField';
import AnimateButton from '../../components/extended/AnimateButton'
import LoadingButton from '@mui/lab/LoadingButton'

const AllMembersPage = () => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const userFetch = useSelector((state) => state.usersFetch)
    const { loading, error, usersGet } = userFetch
    const [rows, setRows] = useState([]);

    const [ searchState, setSearchState ] = useState({
      username_filter: "",
      name_filter: "",
      email_filter: ""
  })

    const [page, setPage] = useState(1);
    const limit = 5
    
    useEffect(() => {
        dispatch(getUsers(searchState.username_filter, searchState.name_filter, searchState.email_filter, 0, limit))
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

    
    const deleteUserHandle = React.useCallback(
      (id) => () => {
        setTimeout(() => {
            dispatch(deleteUser(id))
            setRows((prevRows) => prevRows.filter(row => row.id !== id))
        });
      },
      [],
    )

    const searchHandler = async(values) => {
        setSearchState(values)
        setPage(1)
        setRows([])
        dispatch(getUsers(values.username_filter,values.name_filter,values.email_filter,0,limit))
    }

    const changePageHandler = (event, value) => {
        setPage(value)
        dispatch(getUsers(searchState.username_filter, searchState.name_filter, searchState.email_filter, (value-1)*limit, limit))
    }


    const columns = [
        { field: 'member_id_', headerName: 'ID', width: 40 },
        { field: 'username_', headerName: t('candidates_username'), width: 200 },
        { field: 'full_name_', headerName: t('full_name'), width: 180 },
        { field: 'email_', headerName: 'Email', width: 170},
        { field: 'gender_', headerName: t('gender'), width: 110 },    
        { field: 'nationality_', headerName: t('nationality'), width: 130 },
        { field: 'birth_date_', headerName: t('birth_date'), width: 150 },
        { field: 'member_type_', headerName: t('member_type'), width: 130 },
        { field: 'has_debt_', headerName: t('has_debt_'), width: 110 , type: 'boolean'},
        { field: 'paid_enrollment_', headerName: t('paid_enrollment_'), width: 120, type: 'boolean' },
        { field: 'is_admin_', headerName: t('is_admin_'), width: 120 , type: 'boolean'},
        { field: 'is_deleted_', headerName: t('is_deleted_'), width: 120, type: 'boolean'},
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
                    disabled={params.row.is_deleted_ || params.row.member_id_ === params.id}
                />
            ],
        },
    ];

    return (
        <>
            <MainCard title={t('all_users')} direction='ltr' sx={{height: '100%'}}>
                { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> }
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
                            scrollbarSize={20}
                            sx={{
                                "& .MuiDataGrid-columnHeaders": {
                                    backgroundColor: "rgba(219, 219, 219, 0.5)"
                                }
                            }}
                        />
                        <Pagination sx={{ mt: 2 }} variant="outlined" shape='rounded' color="primary" count={Math.ceil(usersGet.number_of_users / limit)} page={page} onChange={changePageHandler} showFirstButton showLastButton/>
                    </>
                )}
            </MainCard> 
        </>
    )
}

export default AllMembersPage