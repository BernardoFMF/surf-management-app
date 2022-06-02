import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserSports} from '../../store/actions/userActions'
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { CircularProgress, Button, Typography, Stack, Box, Alert, Pagination } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import MainCard from '../../components/cards/MainCard';
import UserSportEditDialog from '../../components/dialogs/UserSportEditDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteUserSport } from '../../store/actions/userActions';

const MySportsPage = () => {
    const theme = useTheme();
    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()
    const userSportDelete = useSelector((state) => state.userSportDelete)
    const { loading: loadingDelete, error: errorDelete, usersSportDelete } = userSportDelete

    const userSportsFetch = useSelector((state) => state.userSportsFetch)
    const { loading, error, userSportsGet } = userSportsFetch
    const [rows, setRows] = useState([]);
    let { id } = useParams()

    const [page, setPage] = useState(1);
    const limit = 5

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
        dispatch(getUserSports(id, 0, limit))
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
        dispatch(getUserSports(id, 0, limit))
    },[dispatch,id])

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
      dispatch(getUserSports(id, (value-1)*limit, limit))
    }

    const deleteUserSportHandle = (id, sid) => {
        dispatch(deleteUserSport(id, sid))
        dispatch(getUserSports(id, 0, limit))
    }

    const columns = [
        { field: 'name_', headerName: t('name'), width: 150 },
        { field: 'type_', headerName: t('type'), width: 200 },
        { field: 'fed_number_', headerName: t('fed_number_'), width: 160 },
        { field: 'fed_id_', headerName: t('fed_id_'), width: 130 },
        { field: 'fed_name_', headerName: t('fed_name_'), width: 290 },
        { field: 'years_federated_', headerName: t('years_federated_'), width: 150 },
        { field: 'is_absent_', headerName: t('is_absent_'), type: 'boolean', width: 130 },
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
                />,
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
            <MainCard title={t('my_sports')} sx={{height: '100%'}}>
            { loading || loadingDelete ? 
                <Stack alignItems="center">
                    <CircularProgress size='4rem'/>
                </Stack> : (
                <>
                    { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> }
                    { errorDelete && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(errorDelete)}</Alert></Box> }
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
                    <Pagination sx={{ mt: 2 }} variant="outlined" shape='rounded' color="primary" count={Math.ceil(userSportsGet.number_of_sports / limit)} page={page} onChange={changePageHandler} showFirstButton showLastButton/> 
                </>
                )}
            </MainCard> 
        </>
    )
}

export default MySportsPage