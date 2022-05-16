import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getUsers } from '../../store/actions/userActions'

import {  useMediaQuery, Box} from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next'
import { DataGrid, GridActionsCellItem, ptBR } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MainCard from '../../components/cards/MainCard';
import { useNavigate } from 'react-router';

const AllMembersPage = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()
    const userFetch = useSelector((state) => state.usersFetch)
    const { loading, error, usersGet } = userFetch
    const [rows, setRows] = useState([]);
    
    useEffect(() => {
            dispatch(getUsers())
    },[])

    useEffect(() => {
        if(usersGet){
            setRows(usersGet.map(user => {
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

const columns = [
    { field: 'member_id_', headerName: 'ID', width: 40 },
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
      <MainCard title='Users'sx={{height: '100%'}}>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          experimentalFeatures={{ newEditingApi: true }}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        /> 
      </MainCard> 
    </>
  )
}

export default AllMembersPage