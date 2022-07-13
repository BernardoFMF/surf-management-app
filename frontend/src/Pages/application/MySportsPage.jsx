import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserSports} from '../../store/actions/userActions'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { CircularProgress, Stack, Box, Alert, Pagination, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import MainCard from '../../components/cards/MainCard';
import UserSportEditDialog from '../../components/dialogs/UserSportEditDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteUserSport } from '../../store/actions/userActions';
import DropdownInputField from '../../components/multiStepForm/DropdownInputField'
import { Form, Formik } from 'formik';
import AnimateButton from '../../components/extended/AnimateButton'
import LoadingButton from '@mui/lab/LoadingButton'
import SearchIcon from '@mui/icons-material/Search'
import Meta from '../../components/Meta'
import { USER_SPORTS_FETCH_RESET, USER_SPORT_DELETE_RESET, USER_SPORT_UPDATE_RESET } from '../../store/constants/userConstants'
import { USER_SPORT_TYPES_FETCH_RESET } from '../../store/constants/sportConstants'
import { getUserSportsTypes } from '../../store/actions/sportActions'

const MySportsPage = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const userSportDelete = useSelector((state) => state.userSportDelete)
    const { loading: loadingDelete, error: errorDelete, usersSportDelete } = userSportDelete

    const userSportsFetch = useSelector((state) => state.userSportsFetch)
    const { loading, error, userSportsGet } = userSportsFetch
    const [rows, setRows] = useState([]);
    let { id } = useParams()

    const [page, setPage] = useState(1);
    const [ searchState, setSearchState ] = useState({
        limit: 10
    })

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const closeDialogHandler = useCallback(function _handleClose() {
        setOpenEditDialog(false);
        setselectedUserSport({
            type_: [ "" ],
            fed_number_: 0,
            fed_id_: 0,
            fed_name_: "",
            years_federated_: [ 0 ],
            is_absent_: false
        })
        setPage(1)
        dispatch(getUserSports(id, 0, searchState.limit))
        dispatch({ type: USER_SPORT_UPDATE_RESET })
    }, []);

    const [selectedUserSport, setselectedUserSport] = useState({
        type_: [ "" ],
        fed_number_: 0,
        fed_id_: 0,
        fed_name_: "",
        years_federated_: [ 0 ],
        is_absent_: false
    })

    function userSportEditHandler(userSport) {
        setselectedUserSport({ ...userSport })
        setOpenEditDialog(true)
    }

    useEffect(() => {
        dispatch(getUserSports(id, 0, searchState.limit))
        dispatch(getUserSportsTypes())
        return () => {
            dispatch({ type: USER_SPORTS_FETCH_RESET })
            dispatch({ type: USER_SPORT_DELETE_RESET })
            dispatch({ type: USER_SPORT_UPDATE_RESET })
            dispatch({ type: USER_SPORT_TYPES_FETCH_RESET })
        }
    },[])

    useEffect(() => {
        if(userSportsGet){
            setRows(userSportsGet.sports.map(sport => {
                let x = {
                    ...sport, id: sport.sport_id_
                }
                return x
            }))
        }
    },[userSportsGet,dispatch])

    const changePageHandler = (event, value) => {
      setPage(value)
      dispatch(getUserSports(id, (value-1)*searchState.limit, searchState.limit))
    }

    const deleteUserSportHandle = (id, sid, is_candidate) => {
        dispatch(deleteUserSport(id, sid, is_candidate))
        dispatch(getUserSports(id, 0, searchState.limit))
    }

    const columns = [
        { field: 'name_', headerName: t('name'), width: 150 ,headerAlign: "center",align:'center'},
        { field: 'type_', headerName: t('type'), width: 200 ,headerAlign: "center",align:'center'},
        { field: 'fed_number_', headerName: t('fed_number_'), width: 160 ,headerAlign: "center",align:'center'},
        { field: 'fed_id_', headerName: t('fed_id_'), width: 130 ,headerAlign: "center",align:'center'},
        { field: 'fed_name_', headerName: t('fed_name_'), width: 290 ,headerAlign: "center",align:'center'},
        { field: 'years_federated_', headerName: t('years_federated_'), width: 150 ,headerAlign: "center",align:'center'},
        { field: 'is_absent_', headerName: t('is_absent_'), type: 'boolean', width: 130 ,headerAlign: "center",align:'center'},
        {
            field: 'actions',
            type: 'actions',
            headerName: t('actions'),
            width: 110,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit User Sport"
                    onClick={() => {
                        userSportEditHandler(params.row)
                    }}
                    disabled={params.row.is_candidate_}
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => { deleteUserSportHandle(params.row.user_id_, params.row.sport_id_, params.row.is_candidate_) }}
                    disabled={params.row.is_absent_}
                />
            ],
      },
    ];

    const searchHandler = async(values) => {
        setSearchState(values)
        setPage(1)
        setRows([])
        dispatch(getUserSports(id, 0, values.limit))
    }
    return (
        <>
            <Meta title={t('my_sports_page_title')}/>
            <UserSportEditDialog
                open={openEditDialog}
                closeHandler={closeDialogHandler}
                userSport={selectedUserSport}
            />
            <MainCard title={t('my_sports')} sx={{height: '100%'}}>
            { loading || loadingDelete ? 
                <Stack alignItems="center">
                    <CircularProgress size='4rem'/>
                </Stack> : (
                <>
                    { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error" onClose={() => dispatch({ type: USER_SPORTS_FETCH_RESET })}>{t(error)}</Alert></Box> }
                    { errorDelete && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error" onClose={() => dispatch({ type: USER_SPORT_DELETE_RESET })}>{t(errorDelete)}</Alert></Box> }
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
                            <Pagination sx={{ mt: 2 }} variant="outlined" shape='rounded' color="primary" count={Math.ceil(userSportsGet.number_of_sports / searchState.limit)} page={page} onChange={changePageHandler} showFirstButton showLastButton/> 
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
                </>
                )}
            </MainCard> 
        </>
    )
}

export default MySportsPage