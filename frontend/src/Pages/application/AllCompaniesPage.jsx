import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCompany, getCompanies, getCompanyById } from '../../store/actions/companyActions'

import {  useMediaQuery, Stack, CircularProgress} from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import MainCard from '../../components/cards/MainCard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const AllCandidatesPage = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()
    const companiesFetch = useSelector((state) => state.companiesFetch)
    const { loading, error, companiesGet } = companiesFetch
    const [rows, setRows] = useState([]);
    
    useEffect(() => {
        dispatch(getCompanies())
    },[])

    useEffect(() => {
        if(companiesGet){
            setRows(companiesGet.map(company => {
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
    { field: 'username_', headerName: t('companies_username'), width: 140 },
    { field: 'name_', headerName: t('companies_name'), width: 250, headerAlign: 'center' },
    { field: 'email_', headerName: 'Email', width: 170 , headerAlign: 'center' },    
    { field: 'has_debt_', headerName: t('companies_has_debt'), width: 110 },
    { field: 'nif_', headerName: 'NIF', width: 110 },
    { field: 'is_deleted_', headerName: t('companies_is_deleted'), width: 110 },
    {
        field: 'actions',
        type: 'actions',
        width: 110,
        getActions: (params) => [
            <GridActionsCellItem
            icon={<HowToRegIcon />}
            label="Show Profile"
            onClick={showProfileHandle(params.id)}
            />,
            <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteCompanyHandle(params.id)}
            />
        ],
    },
];


  return (
    <>
      <MainCard title='Companies'sx={{height: '100%'}}>
      { loading ? 
        <Stack alignItems="center">
            <AccountCircleIcon size='4rem'/>
        </Stack> :
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          experimentalFeatures={{ newEditingApi: true }}
        /> 
      }
      </MainCard> 
    </>
  )
}

export default AllCandidatesPage