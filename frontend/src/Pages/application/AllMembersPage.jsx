import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getUsers } from '../../store/actions/userActions'

import {  useMediaQuery, Box} from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MainCard from '../../components/cards/MainCard';

const AllMembersPage = () => {
    const theme = useTheme();
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
    );
  
    const showProfileHandle = React.useCallback(
      (id) => () => {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === id ? { ...row, isAdmin: !row.isAdmin } : row,
          ),
        );
      },
      [],
    );

const columns = [
    { field: 'member_id_', headerName: 'ID', width: 70 },
    { field: 'full_name_', headerName: 'Full name', width: 130 },
    { field: 'gender_', headerName: 'Gender', width: 130 },
    { field: 'birth_date_', headerName: 'Birth Date', width: 170 },
    { field: 'member_type_', headerName: 'Member Type', width: 130 },
    { field: 'has_debt_', headerName: 'Has Debt', width: 130 , type: 'boolean'},
    { field: 'nationality_', headerName: 'Nationality', width: 130 },
    { field: 'paid_enrollment_', headerName: 'Paid Enrollment', width: 130, type: 'boolean' },
    { field: 'email_', headerName: 'Email', width: 130 },
    { field: 'is_deleted_', headerName: 'Is Deleted', width: 130 , type: 'boolean'},
    {
        field: 'actions',
        type: 'actions',
        width: 110,
        getActions: (params) => [
            <GridActionsCellItem
            icon={<AccountCircleIcon />}
            label="Show Profile"
            onClick={showProfileHandle(params.id)}
            />,
            <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteUserHandle(params.id)}
            disabled={params.row.is_deleted_}

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
        /> 
      </MainCard> 
    </>
  )
}

export default AllMembersPage