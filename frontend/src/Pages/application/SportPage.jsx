import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersSport } from  '../../store/actions/userActions'
import { useParams } from 'react-router-dom'
import Meta from '../../components/Meta'
import { useTranslation } from 'react-i18next'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import MainCard from '../../components/cards/MainCard'
import { Grid, Stack, CircularProgress, Box, Alert, Pagination, Dialog, Typography, DialogContent, DialogActions, } from '@mui/material'
import UserSportEditDialog from '../../components/dialogs/UserSportEditDialog';
import UserSportApplyDialog from '../../components/dialogs/UserSportApplyDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteUserSport, updateUserSports } from '../../store/actions/userActions';
import { Form, Formik } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import InputField from '../../components/multiStepForm/InputField';
import AnimateButton from '../../components/extended/AnimateButton'
import LoadingButton from '@mui/lab/LoadingButton'
import CheckInputField from '../../components/multiStepForm/CheckInputField'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import DropdownInputField from '../../components/multiStepForm/DropdownInputField'
import { getUserSportsTypes } from '../../store/actions/sportActions'
import { USERS_SPORT_FETCH_RESET, USER_SPORT_UPDATE_RESET, USERS_SPORTS_CREATE_RESET } from '../../store/constants/userConstants'
import { USER_SPORT_TYPES_FETCH_RESET } from '../../store/constants/sportConstants'

const SportPage = () => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    let { id } = useParams()
    const usersSportFetch = useSelector((state) => state.usersSportFetch)
    const { loading, error, usersSportGet } = usersSportFetch
    const [rows, setRows] = useState([]);

    const [ searchState, setSearchState ] = useState({
        username_filter: "",
        toggle_filter: false,
        limit: 10
    })

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false)
        dispatch(getUsersSport(id, 0, searchState.limit, searchState.toggle_filter))
        dispatch({ type: USERS_SPORTS_CREATE_RESET })
    };

    const handleOpen = () => setOpen(true);

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
        dispatch(getUsersSport(id, 0, searchState.limit, searchState.toggle_filter))
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
        dispatch(getUsersSport(id, 0, searchState.limit, searchState.toggle_filter))
        dispatch(getUserSportsTypes())

        return () => {
            dispatch({ type: USERS_SPORT_FETCH_RESET })
            dispatch({ type: USERS_SPORTS_CREATE_RESET })
            dispatch({ type: USER_SPORT_UPDATE_RESET })
            dispatch({ type: USER_SPORT_TYPES_FETCH_RESET })
        }
    },[])

    const [page, setPage] = useState(1);

    useEffect(() => {
        if(usersSportGet){
            setRows(usersSportGet.users.map(sport => {
                let x = {
                    ...sport, id: sport.user_id_
                }
                return x
            }))
        }
    },[usersSportGet,dispatch])

    const changePageHandler = (event, value) => {
        setPage(value)
        dispatch(getUsersSport(id, (value-1)*searchState.limit, searchState.limit, searchState.toggle_filter))
    }

    const deleteUserSportHandle = (id, sid) => {
        dispatch(deleteUserSport(id, sid, searchState.toggle_filter))
        dispatch(getUsersSport(sid, 0, searchState.limit, searchState.toggle_filter))
    }

    const approveUserSportHandle = (userSport) => {
        const body = {
            fed_id: userSport.fed_id_,
            fed_number: userSport.fed_number_,
            fed_name: userSport.fed_name_,
            type: userSport.type_,
            years_federated: userSport.years_federated_,
            is_absent: userSport.is_absent_,
            is_candidate: false
        }
        dispatch(updateUserSports(userSport.user_id_, userSport.sport_id_, body))
        dispatch(getUsersSport(id, 0, searchState.limit, searchState.toggle_filter))
    }

    const searchHandler = async(values) => {
        setSearchState(values)
        setPage(1)
        setRows([])
        dispatch(getUsersSport(id, 0, values.limit, values.toggle_filter, values.username_filter))
    }

    const columns = [
        { field: 'username_', headerName: t('username'), width: 150 ,headerAlign: "center",align:'center'},
        { field: 'type_', headerName: t('type'), width: 170 ,headerAlign: "center",align:'center'},
        { field: 'fed_number_', headerName: t('fed_number_'), width: 150 ,headerAlign: "center",align:'center'},
        { field: 'fed_id_', headerName: t('fed_id_'), width: 130 ,headerAlign: "center",align:'center'},
        { field: 'fed_name_', headerName: t('fed_name_'), width: 300 ,headerAlign: "center",align:'center'},
        { field: 'years_federated_', headerName: t('years_federated_'), width: 150 ,headerAlign: "center",align:'center'},
        { field: 'is_absent_', headerName: t('is_absent_'), type: 'boolean',  width: 130 ,headerAlign: "center",align:'center'},
        { field: 'is_candidate_', headerName: t('is_candidate_'), type: 'boolean',  width: 130 ,headerAlign: "center",align:'center'},
        {
            field: 'actions',
            type: 'actions',
            headerName: t('actions'),
            width: 110,
            getActions: (params) => [
                !searchState.toggle_filter ?
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit User Sport"
                    onClick={() => {
                        userSportEditHandler(params.row)
                    }}
                /> :
                <GridActionsCellItem
                    icon={<HowToRegIcon />}
                    label="Approve"
                    onClick={() => {
                        approveUserSportHandle(params.row)
                    }}
                />
                ,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => { deleteUserSportHandle(params.row.user_id_, params.row.sport_id_) }}
                    disabled={params.row.is_absent_}
                />
            ],
      },
    ];

return (
    <>
        <UserSportEditDialog
            open={openEditDialog}
            closeHandler={closeDialogHandler}
            userSport={selectedUserSport}
        />
        <UserSportApplyDialog
            open={open}
            closeHandler={handleClose}
            sid={id}
            byAdmin={true}
        />
        <MainCard title={usersSportGet && usersSportGet.sport ? usersSportGet.sport.name_ : ''} sx={{height: '100%'}}>
        { loading ? 
            <Stack alignItems="center">
                <CircularProgress size='4rem'/>
            </Stack> : (
            <>
                <Meta title={usersSportGet && usersSportGet.sport ? usersSportGet.sport.name_ + ' | ' + t('sport_page_title') : ''}/>
                { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error" onClose={() => dispatch({ type: USERS_SPORT_FETCH_RESET })}>{t(error)}</Alert></Box> }
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
                                            <CheckInputField name='toggle_filter' label={t('is_candidate_')} type='boolean'></CheckInputField>
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
                    <Box gridArea={'create'} alignItems={'center'} display={{md: 'flex', lg: 'flex'}} justifyContent='flex-end' sx={{ mt: { xs: 2, md : 0, lg : 0 }}}>
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
                                {t('associate')}
                            </LoadingButton>
                        </AnimateButton>
                    </Box> 
                </Box>
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
                <Pagination sx={{ mt: 2 }} variant="outlined" shape='rounded' color="primary" count={Math.ceil(usersSportGet.number_of_users / searchState.limit)} page={page} onChange={changePageHandler} showFirstButton showLastButton/>
            </>
            )
        }
        </MainCard> 
    </>
  )
}

export default SportPage